import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function ip(): ValidationRuleContract {
  return {
    name: "ip",
    handler: (value: any) => {
      return validator.isIP(String(value));
    },
  };
}
