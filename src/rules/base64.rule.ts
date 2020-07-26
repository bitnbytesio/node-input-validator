import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function base64(): ValidationRuleContract {
  return {
    name: "base64",
    handler: (value: any) => {
      return validator.isBase64(String(value));
    },
  };
}
