import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function hex(): ValidationRuleContract {
  return {
    name: "hex",
    handler: (value: any) => {
      return validator.isHexadecimal(String(value));
    },
  };
}
