import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function integer(): ValidationRuleContract {
  return {
    name: "integer",
    handler: (value: any) => {
      return validator.isInt(String(value));
    },
  };
}
