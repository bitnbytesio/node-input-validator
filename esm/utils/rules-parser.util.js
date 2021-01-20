import { getKeyValue } from "./obj.util";
/**
  * parse rules those are in string notation
  * @param attrRules attribute string rules
  */
export function parseStringNotationRules(RulesProvider, attrRules) {
    const rulesStrArr = attrRules.split("|");
    const rulesArr = [];
    rulesStrArr.forEach((ruleStr) => {
        const ruleObj = parseStringRule(RulesProvider, ruleStr);
        rulesArr.push(ruleObj);
    });
    return rulesArr;
}
export function parseStringRule(RulesProvider, ruleStr) {
    const ruleNameAndArgs = ruleStr.split(":");
    const [ruleName, ruleArgsStr] = ruleNameAndArgs;
    let args;
    if (ruleArgsStr) {
        args = ruleArgsStr.split(",");
    }
    const ruleProvider = getKeyValue(ruleName)(RulesProvider);
    if (!ruleProvider) {
        throw new Error(`Rule ${ruleName} does not exists.`);
    }
    const ruleObj = ruleProvider(args);
    ruleObj.args = args;
    return ruleObj;
}
//# sourceMappingURL=rules-parser.util.js.map