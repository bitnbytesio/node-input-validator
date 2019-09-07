const validationRules = require('./rules/index');
const postValidationRules = require('./postRules/index');
// const filters = require('./filters');

const { reallyEmpty } = require('./lib/empty');

const implicitRules = [
  'required',
  'requiredIf',
  'requiredNotIf',
  'requiredWith',
  'requiredWithout',
  'accepted',
  'sometimes',
  'nullable',
];

module.exports.implicitRules = implicitRules;

/**
 * apply rules
 * @param {*} field
 * @param {*} validator
 */
module.exports.applyRules = async function apply(field, validator) {
  let proceed = true;

  if (field.multiple) {
    const fieldArr = field.path;

    const fieldName = field.field;

    let len = 0;

    if (fieldArr[0] === '*') {
      len = (validator.inputs || []).length;
    } else {
      len = (validator.inputs[fieldArr[0]] || []).length;
    }

    for (let i = 0; i < len; i++) {
      // const item = validator.inputs[fieldArr[0]][i];

      const indexedField = fieldName.replace('*', i);

      // let value = '';

      // const fieldArrLen = fieldArr.length;

      // if (fieldArrLen == 3) {
      //   value = item[fieldArr[2]];
      // } else if (fieldArrLen == 2) {
      //   value = item;
      // }

      // eslint-disable-next-line no-await-in-loop
      proceed = await apply({
        field: indexedField,
        multiple: false,
        rules: field.rules,
        required: field.required,
      }, validator);
    }

    return proceed;
  }

  for (let r = 0; r < field.rules.length; r++) {
    // eslint-disable-next-line no-param-reassign
    field.value = validator.inputVal(field.field, field.multiple);

    const { rule } = field.rules[r];

    if (rule === 'nullable' || (field.nullable === true && field.value === null)) {
      continue;
    }

    if (typeof validationRules[rule] !== 'function') {
      throw new Error(`Invalid Validation Rule: ${rule} does not exist`);
    }

    if (!field.required && reallyEmpty(field.value)) {
      continue;
    }

    const ruleArgs = [field.field, field.value];

    if (field.rules[r].args) {
      ruleArgs.push(field.rules[r].args);
    }

    // eslint-disable-next-line no-await-in-loop
    const result = await validationRules[rule].apply(validator, ruleArgs);

    if (result && implicitRules.indexOf(field.rules[r].rule) > 0) {
      // eslint-disable-next-line no-param-reassign
      field.required = false;
    }

    if (!result) {
      // validator.validations[field.field].value in place of file.value
      // eslint-disable-next-line no-param-reassign
      field.message = validator.parseMessage(
        field.rules[r].rule,
        field.field,
        field.value,
        field.rules[r].args
      );
      validator.addError(field.field, field.rules[r].rule, field.message);
      proceed = false;
      break;
    }
  }

  return proceed;
};

/**
 * apply post rules
 * @param {*} rule
 * @param {*} validator
 */
module.exports.applyPostRules = async function postApply(rule, validator) {
  if (rule.rule === 'function') {
    // eslint-disable-next-line no-return-await
    return await rule.params.apply(validator, [rule.values]);
  }

  // eslint-disable-next-line no-return-await
  return await postValidationRules[rule.rule].apply(validator, [rule.values, rule.params]);
};
