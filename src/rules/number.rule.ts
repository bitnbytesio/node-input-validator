import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function integer(): ValidationRuleContract {
  return {
    name: "integer",
    handler: (value: any) => {
      return validator.isInt(String(value));
    },
  };
}


export function min(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const minNum = Number(args[0]);

  if (isNaN(minNum)) {
    throw new TypeError('Seed must be number.');
  }

  return {
    name: "min",
    handler: (value: any) => {
      const v = String(value);

      if (
        !validator.isNumeric(v)
        || Number(v) < minNum
      ) {
        return false;
      }

      return true;
    },
  };
}

export function max(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const maxNum = Number(args[0]);

  if (isNaN(maxNum)) {
    throw new TypeError('Seed must be number.');
  }

  return {
    name: "max",
    handler: (value: any) => {
      const v = String(value);

      if (
        !validator.isNumeric(v)
        || Number(v) > maxNum
      ) {
        return false;
      }

      return true;
    },
  };
}

export function decimal(): ValidationRuleContract {
  return {
    name: "decimal",
    handler: (value: any) => {
      return validator.isDecimal(String(value));
    },
  };
}

export function numeric(): ValidationRuleContract {
  return {
    name: "numeric",
    handler: (value: any) => {
      return validator.isNumeric(String(value));
    },
  };
}
