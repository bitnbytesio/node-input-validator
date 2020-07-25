import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function url(): ValidationRuleContract {
  return {
    name: "url",
    handler: (value: any) => {
      return validator.isURL(value);
    },
  };
}
