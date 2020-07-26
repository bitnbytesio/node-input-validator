import { ValidationRuleContract } from "../contracts";

export function maxLength(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const maxNum = parseInt(args[0], 10);

  return {
    name: "maxLength",
    handler: (value: any) => {
      return value.toString().length <= maxNum;
    },
  };
}

export function minLength(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const maxNum = parseInt(args[0], 10);

  return {
    name: "minLength",
    handler: (value: any) => {
      return (value.toString().length >= maxNum);
    },
  };
}
