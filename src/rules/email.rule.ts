import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function email(): ValidationRuleContract {
  return {
    name: "email",
    handler: (value: any) => {
      return validator.isEmail(String(value))
    },
  };
}
