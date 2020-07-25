import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function ip(): ValidationRuleContract {
  return {
    name: "ip",
    handler: (value: any) => {
      if (!validator.isIP(String(value))) {
        return false;
      }

      return true;
    },
  };
}
