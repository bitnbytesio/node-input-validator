"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStringRule = exports.parseStringNotationRules = void 0;
const obj_util_1 = require("./obj.util");
/**
  * parse rules those are in string notation
  * @param attrRules attribute string rules
  */
function parseStringNotationRules(RulesProvider, attrRules) {
    const rulesStrArr = attrRules.split("|");
    const rulesArr = [];
    rulesStrArr.forEach((ruleStr) => {
        const ruleObj = parseStringRule(RulesProvider, ruleStr);
        rulesArr.push(ruleObj);
    });
    return rulesArr;
}
exports.parseStringNotationRules = parseStringNotationRules;
function parseStringRule(RulesProvider, ruleStr) {
    const ruleNameAndArgs = ruleStr.split(":");
    const [ruleName, ruleArgsStr] = ruleNameAndArgs;
    let args;
    if (ruleArgsStr) {
        args = ruleArgsStr.split(",");
    }
    const ruleProvider = obj_util_1.getKeyValue(ruleName)(RulesProvider);
    if (!ruleProvider) {
        throw new Error(`Rule ${ruleName} does not exists.`);
    }
    const ruleObj = ruleProvider(args);
    ruleObj.args = args;
    return ruleObj;
}
exports.parseStringRule = parseStringRule;
//# sourceMappingURL=rules-parser.util.js.map