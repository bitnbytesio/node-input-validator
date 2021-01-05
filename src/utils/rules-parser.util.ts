import { ValidationRuleContract } from "../contracts";
import { getKeyValue } from "./obj.util";

/**
  * parse rules those are in string notation
  * @param attrRules attribute string rules
  */
export function parseStringNotationRules(RulesProvider: any, attrRules: string): Array<ValidationRuleContract> {
  const rulesStrArr = attrRules.split("|");

  const rulesArr: Array<ValidationRuleContract> = [];

  rulesStrArr.forEach((ruleStr) => {
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

    rulesArr.push(ruleObj);
  });

  return rulesArr;
}
