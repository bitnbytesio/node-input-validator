const validationRules = require('./rules');
const postValidationRules = require('./postRules');
const filters = require('./filters');

const implicitRules = [
    'required', 'requiredIf', 'requiredNotIf', 'requiredWith', 'requiredWithout', 'accepted', 'sometimes', 'nullable'
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


        let fieldArr = field.path;

        let fieldName = field.field;



        for (let i in validator.inputs[fieldArr[0]]) {

            let item = validator.inputs[fieldArr[0]][i];

            //console.log(item, fieldArr);

            let indexedField = fieldName.replace('*', i);

            //fieldWithIndex.push(indexedField);

            let value = '';

            let fieldArrLen = fieldArr.length;

            if (fieldArrLen == 3) {
                value = item[fieldArr[2]];
            } else if (fieldArrLen == 2) {
                value = item;
            }

            proceed = await apply({
                field: indexedField,
                multiple: false,
                rules: field.rules,
                required: field.required
            }, validator);

        }

        return proceed;
    }

    for (let r = 0; r < field.rules.length; r++) {

        field.value = validator.inputVal(field.field, field.multiple);

        // if (field.value == false) {
        //     field.value = String(field.value);
        // }

        //console.log('validated rule', field.rules[r], field);
        //console.log('--------------------------------------');

        const rule = field.rules[r].rule;

        //console.log('field value is', field.value);

        if (rule == 'nullable' || field.nullable === true && field.value == null) {
            continue;
        }

        if (typeof validationRules[rule] !== 'function') {
            throw new Error('Invalid Validation Rule: ' + rule + ' does not exist');
        }

        if (!field.required && validator.isEmpty(field.value)) {
            continue;
        }

        let ruleArgs = [field.field, field.value || ''];

        if (field.rules[r].args) {
            ruleArgs.push(field.rules[r].args);
        }

        let result = await validationRules[rule].apply(validator, ruleArgs);

        if (result && implicitRules.indexOf(field.rules[r].rule) > 0) {
            field.required = false;
        }

        if (!result) {

            //validator.validations[field.field].value in place of file.value
            field.message = validator.parseMessage(field.rules[r].rule, field.field, field.value, field.rules[r].args);
            validator.addError(field.field, field.rules[r].rule, field.message);
            proceed = false;
            break;
        }

    }

    return proceed;

}

/**
 * apply post rules
 * @param {*} rule
 * @param {*} validator
 */
module.exports.applyPostRules = async function postApply(rule, validator) {

    if (rule.rule == 'function') {
        return await rule.params.apply(validator, [rule.values]);
    }

    return await postValidationRules[rule.rule].apply(validator, [rule.values, rule.params]);

}