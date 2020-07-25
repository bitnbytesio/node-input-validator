import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function numeric(): ValidationRuleContract {
  return {
    name: "numeric",
    handler: (value: any) => {
      return validator.isNumeric(String(value));
    },
  };
}
