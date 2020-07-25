import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function macAddress(): ValidationRuleContract {
  return {
    name: "macAddress",
    handler: (value: any) => {
      return validator.isMACAddress(String(value));
    },
  };
}
