import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function regex(args: Array<any>): ValidationRuleContract {
  return {
    name: "regex",
    handler: (value: any, v: ValidatorContract) => {
      const [pattren] = args;
      const regexp = new RegExp(v.attributeValue(pattren));

      if (!regexp.test(value)) {
        return false;
      }

      return true;
    },
  };
}
