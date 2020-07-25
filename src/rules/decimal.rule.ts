import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function decimal(): ValidationRuleContract {
  return {
    name: "decimal",
    handler: (value: any) => {
      return validator.isDecimal(String(value));
    },
  };
}
