import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function after(
  args: Array<string> = []
): ValidationRuleContract {
  const date = args[0] || undefined;

  return {
    name: "after",
    handler: (value: any) => {
      return validator.isAfter(String(value), date);
    },
  };
}
