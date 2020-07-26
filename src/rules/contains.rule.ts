import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function contains(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [find] = args;

  return {
    name: "contains",
    handler: (value: any) => {
      return validator.contains(String(value), find);
    },
  };
}

export function notContains(args: Array<any>): ValidationRuleContract {
  const containsHandler = contains(args).handler

  return {
    name: "notContains",
    handler: (value: any) => {
      return !containsHandler(value);
    },
  };
}
