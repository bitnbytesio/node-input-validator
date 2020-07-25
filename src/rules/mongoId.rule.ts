import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function mongoId(): ValidationRuleContract {
  return {
    name: "mongoId",
    handler: (value: any) => {
      return validator.isMongoId(String(value));
    },
  };
}
