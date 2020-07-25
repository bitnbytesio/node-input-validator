import validator from 'validator';

import { ValidationRuleContract } from "../contracts";


export function alpha(
): ValidationRuleContract {
  return {
    name: "alpha",
    handler: (value: any) => {
      return validator.isAlpha(value + "");
    },
  };
}
