const get = require('lodash/get');
const {dynamicComparisonOperators} = require("../lib/dynamicComparisonOperators");

/**
 * This rule reads like `percentage if this is [operator] than a [percentage]% of [other-field]`
 * Rule Example:
 * "validation": "percentageIfThisNumberIs:>,40%,household.sum-insured"
 * "validation": "ifThisDateIs:>=,household.date"
 * @param {string} field
 * @param {string} value
 * @param {array} args
 */
module.exports = async function ifThisDateIs(field, value, args) {
    const [operation, property] = args;
    const fieldValueDate = new Date(value);
    const fieldValueInMs = fieldValueDate.getTime();
    const relatedPropertyValue = get(this.inputs, property);
    const relatedPropertyDate = new Date(relatedPropertyValue);
    const relatedPropertyValueInMs = relatedPropertyDate.getTime();

    return dynamicComparisonOperators(operation, fieldValueInMs, relatedPropertyValueInMs);
}
