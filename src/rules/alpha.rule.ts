import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

/**
 * The field under validation must be entirely alphabetic characters.
 */
export function alpha(
): ValidationRuleContract {
  return {
    name: "alpha",
    handler: (value: any) => {
      return validator.isAlpha(value + "");
    },
  };
}

/**
 * The field under validation may have alpha characters, as well as hyphens and underscores.
 */
export function alphaDash(
): ValidationRuleContract {
  return {
    name: "alphaDash",
    handler: (value: any) => {
      if (!(/^[A-Z_-]+$/i.test(value + ""))) {
        return false;
      }

      return true;
    },
  };
}

/**
 * The field under validation may have alpha characters, as well as hyphens.
 */
export function alphaHyphen(
): ValidationRuleContract {
  return {
    name: "alphaHyphen",
    handler: (value: any) => {
      if (!(/^[A-Z-]+$/i.test(value + ""))) {
        return false;
      }

      return true;
    },
  };
}

/**
 * The field under validation must contains alpha-numeric characters.
 */
export function alphaNumeric(
): ValidationRuleContract {
  return {
    name: "alphaNumeric",
    handler: (value: any) => {
      return validator.isAlphanumeric(value + "");
    },
  };
}

/**
 * The field under validation may have alpha-numeric characters, as well as hyphens and underscores.
 */
export function alphaNumericDash(
): ValidationRuleContract {
  return {
    name: "alphaNumericDash",
    handler: (value: any) => {
      if (!(/^[A-Z0-9_-]+$/i.test(value + ""))) {
        return false;
      }

      return true;
    },
  };
}
