import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function hash(args: Array<any>): ValidationRuleContract {
  return {
    name: "hash",
    handler: (value: any) => {
      return validator.isHash(String(value), args[0]);
    },
  };
}
