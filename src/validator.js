/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
// @ts-ignore
const validationRules = require('./rules');
// @ts-ignore
const postValidationRules = require('./postRules');

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
        const validatorInputs = validator.inputs[fieldArr[0]];
        // eslint-disable-next-line guard-for-in
        for (const i in validatorInputs) {
            const indexedField = fieldName.replace('*', i);
            proceed = await apply(
                {
                    field: indexedField,
                    multiple: false,
                    rules: field.rules,
                    required: field.required,
                },
                validator,
            );
        }

        return proceed;
    }

    for (let r = 0; r < field.rules.length; r++) {
        field.value = validator.inputVal(field.field, field.multiple);
        const { rule } = field.rules[r];
        if (
            rule == 'nullable'
            || (field.nullable === true && field.value == null)
        ) {
            continue;
        }

        if (typeof validationRules[rule] !== 'function') {
            throw new Error(`Invalid Validation Rule: ${rule} does not exist`);
        }

        if (!field.required && validator.isEmpty(field.value)) {
            continue;
        }

        const ruleArgs = [field.field, field.value || ''];

        if (field.rules[r].args) {
            ruleArgs.push(field.rules[r].args);
        }

        const result = await validationRules[rule].apply(validator, ruleArgs);

        if (result && implicitRules.indexOf(field.rules[r].rule) > 0) {
            field.required = false;
        }

        if (!result) {
            field.message = validator.parseMessage(
                field.rules[r].rule,
                field.field,
                field.value,
                field.rules[r].args,
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
    if (rule.rule == 'function') {
        return rule.params.apply(validator, [rule.values]);
    }

    return postValidationRules[rule.rule].apply(validator, [
        rule.values,
        rule.params,
    ]);
};
