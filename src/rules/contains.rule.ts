import { ValidationRuleContract } from "../contracts.js";

export function contains(args: Array<string>): ValidationRuleContract {
  if (args.length < 1 || args.length > 2) {
    throw new Error('Invalid number of arguments.');
  }

  const [find, modifier] = args;

  if (modifier && modifier !== 'i') {
    throw new Error('Only support modifier is insensitive (i).');
  }

  return {
    name: "contains",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      if (modifier === 'i') {
        return value.toLowerCase().indexOf(find.toLowerCase()) >= 0;
      }

      return value.indexOf(find) >= 0;
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
