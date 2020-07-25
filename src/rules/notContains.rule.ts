
import { ValidationRuleContract, ValidatorContract } from "../contracts";
import { contains } from "./contains.rule";

export function notContains(args: Array<any>): ValidationRuleContract {
  return {
    name: "notContains",
    handler: (value: any, v: ValidatorContract) => {
      return !contains(args).handler(value, v);
    },
  };
}
