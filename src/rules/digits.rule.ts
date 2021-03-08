import { ValidationRuleContract } from "../contracts";

import { isInt } from '../utils/number.util';

export function digits(args: Array<string> = []): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [lenStr] = args;

  const len = parseInt(lenStr, 10);

  if (!len) {
    throw new TypeError('Seed must be number, greater then 0.');
  }

  return {
    name: "digits",
    handler: (value: any) => {
      const v = String(value);
      if (
        isInt(v, true)
        && v.length === len
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

  const minInt = parseInt(min, 10);
  const maxInt = parseInt(max, 10);

  if (!minInt || !maxInt) {
    throw new TypeError('Seeds must be number, greater then 0.');
  }

  if (min > max) {
    throw new RangeError('Seed min must be less then max.');
  }

  return {
    name: "digitsBetween",
    handler: (value: any) => {
      const v = String(value);
      const len = v.length;
      if (
        isInt(v, true)
        && len >= minInt
        && len <= maxInt
      ) {
        return true;
      }

      return false;
    },
  };
}
