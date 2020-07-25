import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function contains(args: Array<any>): ValidationRuleContract {
  return {
    name: "contains",
    handler: (value: any, v: ValidatorContract) => {
      const [find] = args;
      if (!validator.contains(String(value), v.attributeValue(find))) {
        return false;
      }

      return true;
    },
  };
}
