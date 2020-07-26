import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function latLong(): ValidationRuleContract {
  return {
    name: "latLong",
    handler: (value: any) => {
      return validator.isLatLong(String(value));
    },
  };
}
