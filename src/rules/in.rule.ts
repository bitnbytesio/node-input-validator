import { ValidationRuleContract } from "../contracts";

export function _in(args: Array<any>): ValidationRuleContract {
  if (!args.length) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "in",
    handler: (value: any): boolean => {
      return !(args.indexOf(value) < 0);
    },
  };
}

export function notIn(args: Array<any>): ValidationRuleContract {
  if (!args.length) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "notIn",
    handler: (value: any): boolean => {
      return !_in(args).handler(value);
    },
  };
}
