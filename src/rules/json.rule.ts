import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function json(): ValidationRuleContract {
  return {
    name: "json",
    handler: (value: any) => {
      if (!validator.isJSON(String(value))) {
        return false;
      }

      return true;
    },
  };
}
