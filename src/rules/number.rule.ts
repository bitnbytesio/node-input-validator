import { ValidationRuleContract } from "../contracts";

import { isDecimal, isInt, isNumeric } from '../utils/number.util';

export function integer(args: Array<'0'> = []): ValidationRuleContract {
  return {
    name: "integer",
    handler: (value: any) => {
      return isInt(value + "", args && args[0] === '0');
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
        !isNumeric(v)
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
        !isNumeric(v)
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
      if (typeof value !== 'string') {
        return false;
      }

      return isDecimal(value);
    },
  };
}

export function numeric(): ValidationRuleContract {
  return {
    name: "numeric",
    handler: (value: any) => {
      return isNumeric(value + "");
    },
  };
}
