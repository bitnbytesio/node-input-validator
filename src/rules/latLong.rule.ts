import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function latLong(): ValidationRuleContract {
  return {
    name: "latLong",
    handler: (value: any) => {
      if (validator.isLatLong(String(value))) {
        return true;
      }

      return false;
    },
  };
}
