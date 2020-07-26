import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function dateiso(): ValidationRuleContract {
  return {
    name: "dateiso",
    handler: (value: any) => {
      return validator.isISO8601(String(value));
    },
  };
}


export function iso8601(): ValidationRuleContract {
  return dateiso();
}
