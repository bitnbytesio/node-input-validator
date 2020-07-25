
import { ValidationRuleContract, ValidatorContract } from "../contracts";
import { _in } from "./in.rule";

export function notIn(args: Array<any>): ValidationRuleContract {
  return {
    name: "notIn",
    handler: (value: any, v: ValidatorContract) => {
      return !_in(args).handler(value, v);
    },
  };
}
