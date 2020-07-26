import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function json(): ValidationRuleContract {
  return {
    name: "json",
    handler: (value: any) => {
      return validator.isJSON(String(value));
    },
  };
}
