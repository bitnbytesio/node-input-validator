import { ValidationRuleContract } from "../contracts";

import { reallyEmpty } from "../utils/ops.util";

export function required(): ValidationRuleContract {
  return {
    name: "required",
    handler: (value: any): boolean => {
      return reallyEmpty(value) === false;
    },
  };
}
