import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function hexColor(): ValidationRuleContract {
  return {
    name: "hexColor",
    handler: (value: any) => {
      return validator.isHexColor(String(value));
    },
  };
}
