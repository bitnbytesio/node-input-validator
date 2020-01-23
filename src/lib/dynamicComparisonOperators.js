
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
            return a == b;
        case '===':
            return a === b;
    }
}

function percentageRuleComparison(operation, percentage, fieldValue, relatedPropertyValue) {
    const relatedPropertyValueComparator = relatedPropertyValue * percentage.slice(0, percentage.length - 1) / 100;

    return dynamicComparisonOperators(operation, fieldValue, relatedPropertyValueComparator);
}

module.exports = { dynamicComparisonOperators, percentageRuleComparison };
