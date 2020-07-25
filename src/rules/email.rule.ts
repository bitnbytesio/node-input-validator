import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function email(): ValidationRuleContract {
  return {
    name: "email",
    handler: (value: any) => {
      if (!validator.isEmail(String(value))) {
        return false;
      }

      return true;
    },
  };
}
