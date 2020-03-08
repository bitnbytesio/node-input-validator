/* eslint-disable default-case */

function dynamicComparisonOperators(operation, a, b) {
    switch (operation) {
    case '<':
        return a < b;
    case '>':
        return a > b;
    case '<=':
        return a <= b;
    case '>=':
        return a >= b;
    case '==':
    case '=':
        // eslint-disable-next-line eqeqeq
        return a == b;
    case '===':
        return a === b;
    }
    return true;
}

function percentageRuleComparison(operation, percentage, fieldValue, relatedPropertyValue) {
    // eslint-disable-next-line no-mixed-operators
    const relatedPropertyValueComparator = relatedPropertyValue * percentage.slice(0, percentage.length - 1) / 100;

    return dynamicComparisonOperators(operation, fieldValue, relatedPropertyValueComparator);
}

module.exports = { dynamicComparisonOperators, percentageRuleComparison };
