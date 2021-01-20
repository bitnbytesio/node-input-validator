import { ValidationRuleContract } from "../contracts";
/**
  * parse rules those are in string notation
  * @param attrRules attribute string rules
  */
export declare function parseStringNotationRules(RulesProvider: any, attrRules: string): Array<ValidationRuleContract>;
export declare function parseStringRule(RulesProvider: any, ruleStr: string): ValidationRuleContract;
