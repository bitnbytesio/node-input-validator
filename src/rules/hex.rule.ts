import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function hex(): ValidationRuleContract {
  return {
    name: "hex",
    handler: (value: any) => {
      return validator.isHexadecimal(String(value));
    },
  };
}

export function hexColor(): ValidationRuleContract {
  return {
    name: "hexColor",
    handler: (value: any) => {
      return validator.isHexColor(String(value));
    },
  };
}
