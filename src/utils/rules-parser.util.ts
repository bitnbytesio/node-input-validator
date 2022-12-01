import { ValidationRuleContract } from "../contracts.js";
import { getKeyValue } from "./obj.util.js";

/**
  * parse rules those are in string notation
  * @param attrRules attribute string rules
  */
export function parseStringNotationRules(RulesProvider: any, attrRules: string): Array<ValidationRuleContract> {
  const rulesStrArr = attrRules.split("|");

  const rulesArr: Array<ValidationRuleContract> = [];

  rulesStrArr.forEach((ruleStr) => {
    const ruleObj = parseStringRule(RulesProvider, ruleStr);

    rulesArr.push(ruleObj);
  });

  return rulesArr;
}


export function parseStringRule(RulesProvider: any, ruleStr: string): ValidationRuleContract {
  const ruleNameAndArgs: Array<string> = ruleStr.split(":");
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
