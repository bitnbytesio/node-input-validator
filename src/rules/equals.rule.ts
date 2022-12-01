import { ValidationRuleContract } from "../contracts.js";

export function equals(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [otherValue] = args;
  return {
    name: "equals",
    handler: (value: any) => {
      return value === otherValue;
    },
  };
}
