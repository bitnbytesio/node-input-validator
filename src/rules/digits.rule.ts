import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function digits(args: Array<string> = []): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [len] = args;

  if (!validator.isInt(len)) {
    throw new TypeError('Seeds must be number.');
  }

  const lenInt = parseInt(len, 10);

  return {
    name: "digits",
    handler: (value: any) => {
      const v = String(value);
      if (
        validator.isInt(v)
        && v.length === lenInt
      ) {
        return true;
      }

      return false;
    },
  };
}


export function digitsBetween(args: Array<string> = []): ValidationRuleContract {
  if (args.length !== 2) {
    throw new Error('Invalid number of arguments.');
  }

  const [min, max] = args;

  if (!validator.isInt(min) || !validator.isInt(max)) {
    throw new TypeError('Seeds must be number.');
  }

  const minInt = parseInt(min, 10);
  const maxInt = parseInt(max, 10);

  return {
    name: "digitsBetween",
    handler: (value: any) => {
      const v = String(value);
      const len = v.length;
      if (
        validator.isInt(v)
        && len >= minInt
        && len <= maxInt
      ) {
        return true;
      }

      return false;
    },
  };
}
