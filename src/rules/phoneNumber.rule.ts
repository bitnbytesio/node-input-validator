import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function phoneNumber(): ValidationRuleContract {
  return {
    name: "phoneNumber",
    handler: (value: any) => {
      return validator.isMobilePhone(String(value));
    },
  };
}
