import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function domain(): ValidationRuleContract {
  return {
    name: "domain",
    handler: (value: any) => {
      return validator.isFQDN(String(value));
    },
  };
}
