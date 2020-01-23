const _ = require('lodash');
const {percentageRuleComparison} = require("../lib/dynamicComparisonOperators");

module.exports = async function percentageIfThisNumberIs(field, value, args) {
    const [operation, percentage, property] = args;
    const relatedPropertyValue = _.get(this.inputs, property);

    return percentageRuleComparison(operation, percentage, value, relatedPropertyValue);
}
