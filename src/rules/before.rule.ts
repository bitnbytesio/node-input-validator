import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function before(
  args: Array<string>
): ValidationRuleContract {
  const date = args[0] || undefined;

  return {
    name: "before",
    handler: (value: any) => {
      return validator.isBefore(String(value), date);
    },
  };
}
