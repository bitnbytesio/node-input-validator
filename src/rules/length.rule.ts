import { ValidationRuleContract } from "../contracts.js";

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


export function length(args: Array<string>): ValidationRuleContract {
  let min: number;

  if (args.length < 1 || args.length > 2) {
    throw new Error('Invalid number of arguments.');
  }

  const max: number = parseInt(args[0], 10);

  if (args[1]) {
    min = parseInt(args[1], 10);
  }

  return {
    name: 'length',
    handler: (value: any): boolean => {
      const len = value.length;

      if (len <= max) {
        if (min && len < min) {
          return false;
        }

        return true
      }

      return false;
    },
  };
}


export function lengthBetween(args: Array<string>): ValidationRuleContract {
  if (args.length !== 2) {
    throw new Error('Invalid number of arguments.');
  }

  const min: number = parseInt(args[0], 10);

  const max: number = parseInt(args[1], 10);

  if (min >= max) {
    throw new RangeError('Seed min must be less then max.');
  }

  return {
    name: 'lengthBetween',
    handler: (value: any): boolean => {
      if (typeof value === 'string' || Array.isArray(value)) {
        const len = value.length;

        if (len < min || len > max) {
          return false;
        }

        return true;
      }

      return false;
    },
  };
}
