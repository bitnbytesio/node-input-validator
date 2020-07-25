import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function creditCard(): ValidationRuleContract {
  return {
    name: "creditCard",
    handler: (value: any): boolean => {
      return validator.isCreditCard(String(value));
    },
  };
}
