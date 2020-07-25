import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function digits(args: Array<string> = []): ValidationRuleContract {
  return {
    name: "digits",
    handler: (value: any) => {
      const [len] = args;

      const v = value + "";

      if (validator.isInt(v, {}) && v.length === parseInt(len, 10)) {
        return true;
      }

      return false;
    },
  };
}
