/* istanbul ignore file */

import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function datetime(): ValidationRuleContract {
  return {
    name: "datetime",
    handler: (value: any): boolean => {
      // @ts-ignore
      return validator.isDate(String(value), 'YYYY-MM-DD HH:mm:ss');
    },
  };
}
