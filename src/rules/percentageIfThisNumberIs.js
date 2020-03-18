const get = require('lodash/get');
const { percentageRuleComparison } = require('../lib/dynamicComparisonOperators');

module.exports = async function percentageIfThisNumberIs(field, value, args) {
    const [operation, percentage, property] = args;
    // @ts-ignore
    const relatedPropertyValue = get(this.inputs, property);

    return percentageRuleComparison(operation, percentage, value, relatedPropertyValue);
};
