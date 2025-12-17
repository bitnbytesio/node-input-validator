import { ValidationRuleContract } from "../contracts.js";

// This file is the perfect example of when to place multiple rules in same file.
// All rules in this file have common check ie. isArray and on top of that 
// 2 of them have unique check.

/**
 * The field under validation must be array.
 */
export function array(): ValidationRuleContract {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
}

/**
 * @since v3.5
 * 
 * The field under validation must be array of unique values.
 * No need to use array rule. This rule will take care of that.
 */
export function arrayUnique(): ValidationRuleContract {
  return {
    name: "arrayUnique",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      return (new Set(value)).size === value.length;
    },
  };
}

/**
 * @since v3.5
 * 
 * The field under validation must be array and should have objects with unique attributes as per seed.
 * No need to use array rule. This rule will take care of that.
 * @param args seeds
 */
export function arrayUniqueObjects(
  args: Array<string>,
): ValidationRuleContract {
  return {
    name: "arrayUniqueObjects",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      const result = new Set(value.map((o) => {
        let output = "";

        for (const attr of args) {
          output += o[attr];
        }

        return output;
      }));
      return result.size === value.length;
    },
  };
}

/**
 * @since v5
 * 
 * The field under validation must be array of length as per seed.
 * @param args seeds
 */
export function arrayLen(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const len = parseInt(args[0], 10);
  return {
    name: "arrayLen",
    handler: (value: any) => {
      return (Array.isArray(value) && value.length === len);
    },
  };
}


/**
 * Validates that the array has at most `max` items, and optionally at least `min` items.
 *
 * @since v5
 * @param args[0] max - Maximum number of items allowed
 * @param args[1] min - (Optional) Minimum number of items required
 *
 * @example
 * // Max only: array must have at most 5 items
 * 'items': 'arrayLenRange:5'
 *
 * // Range: array must have between 2 and 5 items
 * 'items': 'arrayLenRange:5,2'
 */
export function arrayLenRange(args: Array<string>): ValidationRuleContract {
  if (args.length < 1 || args.length > 2) {
    throw new Error('Invalid number of arguments.');
  }

  const max = parseInt(args[0], 10);
  const hasMin = args.length > 1;
  const min = hasMin ? parseInt(args[1], 10) : 0;

  return {
    name: "arrayLenRange",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }
      const len = value.length;
      return len <= max && (!hasMin || len >= min);
    },
  };
}


/**
 * @since: v5
 * The field under validation must be array and has minumun length as per seed.
 * @param args seeds
 */
export function arrayLenMin(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const min = parseInt(args[0], 10);

  return {
    name: "arrayLenMin",
    handler: (value: any) => {
      const len = value.length;
      return (Array.isArray(value) && len >= min);
    },
  };
}

/**
 * @since: v5
 * The field under validation must be array and has maximum length as per seed.
 * @param args seeds
 */
export function arrayLenMax(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const max = parseInt(args[0], 10);

  return {
    name: "arrayLenMax",
    handler: (value: any) => {
      const len = value.length;
      return (Array.isArray(value) && len <= max);
    },
  };
}
