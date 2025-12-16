import { ValidationRuleContract, ValidatorContract } from "../contracts.js";

import { reallyEmpty } from "../utils/ops.util.js";

export function required(): ValidationRuleContract {
  return {
    name: "required",
    handler: (value: any): boolean => {
      return reallyEmpty(value) === false;
    },
  };
}

export function requiredIf(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 2
    || argsLen % 2 !== 0
  ) {
    throw new Error(`Invalid number of arguments.`);
  }

  return {
    name: "requiredIf",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = true;
      let i = 0;

      for (i; i < argsLen; i += 2) {
        const attrName = args[i];
        const requiredAttrVal = args[i + 1];
        const actualValue = v.attributeValue(attrName);

        if (
          reallyEmpty(actualValue)
          || String(requiredAttrVal) !== String(actualValue)) {
          required = false;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}

/**
 * The attribute under validation is required,
 * unless another attribute matches a specific value.
 * @param args [field, value] pairs - field may be blank if field === value
 */
export function requiredNotIf(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 2
    || argsLen % 2 !== 0
  ) {
    throw new Error(`Invalid number of arguments.`);
  }

  return {
    name: "requiredNotIf",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = true;
      let i = 0;

      for (i; i < argsLen; i += 2) {
        const attrName = args[i];
        const exemptValue = args[i + 1];
        const actualValue = v.attributeValue(attrName);

        // If the field matches the exempt value, this field is NOT required
        if (
          !reallyEmpty(actualValue)
          && String(exemptValue) === String(actualValue)
        ) {
          required = false;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}

/**
 * The attribute under validation consider required,
 * if any attribute given in seed is empty or missing.
 * @param args attribute names
 */
export function requiredWithout(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 1
  ) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "requiredWithout",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = false;
      let i = 0;

      for (i; i < argsLen; i += 1) {
        const attrName = args[i];
        const actualValue = v.attributeValue(attrName);

        if (reallyEmpty(actualValue)) {
          required = true;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}

/**
 * The attribute under validation consider required,
 * if any all the given attibutes in seed are empty or missing.
 * @since v5
 * @param args attribute names
 */
export function requiredWithoutAll(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 1
  ) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "requiredWithoutAll",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = true;
      let i = 0;

      // Field is required only if ALL specified fields are empty
      // As soon as we find one with a value, field becomes optional
      for (i; i < argsLen; i += 1) {
        const attrName = args[i];
        const actualValue = v.attributeValue(attrName);

        if (!reallyEmpty(actualValue)) {
          required = false;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}

/**
 * The attribute under validation consider required,
 * if any attribute given in seed has valid value.
 * @param args attribute names
 */
export function requiredWith(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 1
  ) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "requiredWith",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = true;
      let i = 0;

      for (i; i < argsLen; i += 1) {
        const attrName = args[i];
        const actualValue = v.attributeValue(attrName);

        if (reallyEmpty(actualValue)) {
          required = false;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}

/**
 * The attribute under validation consider required,
 * if all the given attributes in seed has valid values.
 * @since v5
 * @param args attribute names
 */
export function requiredWithAll(args: Array<string>): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 1
  ) {
    throw new Error('Invalid number of arguments.');
  }

  return {
    name: "requiredWithAll",
    handler: (value: any, v: ValidatorContract): boolean => {
      let required = true;
      let i = 0;

      // Field is required only if ALL specified fields have values
      // As soon as we find one that's empty, field becomes optional
      for (i; i < argsLen; i += 1) {
        const attrName = args[i];
        const actualValue = v.attributeValue(attrName);

        if (reallyEmpty(actualValue)) {
          required = false;
          break;
        }
      }

      return (required && reallyEmpty(value)) ? false : true;
    },
  };
}
