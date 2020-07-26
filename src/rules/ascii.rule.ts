import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function ascii(): ValidationRuleContract {
  return {
    name: "ascii",
    handler: (value: any) => {
      return validator.isAscii(String(value));
    },
  };
}
