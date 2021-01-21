import { ValidationRuleContract } from "../contracts";

const REGEX_ALPHA = /^[A-Z]+$/i;
const REGEX_ALPHA_DASH = /^[A-Z_-]+$/i;
const REGEX_ALPHA_HYPHEN = /^[A-Z-]+$/i;
const REGEX_ALPHA_NUMERIC = /^[0-9A-Z]+$/i;
const REGEX_ALPHA_NUMERIC_DASH = /^[A-Z0-9_-]+$/i;

/**
 * The field under validation must be entirely alphabetic characters.
 */
export function alpha(
): ValidationRuleContract {
  return {
    name: "alpha",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return REGEX_ALPHA.test(value);
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
      if (typeof value !== 'string') {
        return false;
      }

      return REGEX_ALPHA_DASH.test(value);
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
      if (typeof value !== 'string') {
        return false;
      }

      return REGEX_ALPHA_HYPHEN.test(value);
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
      if (typeof value !== 'string') {
        return false;
      }

      return REGEX_ALPHA_NUMERIC.test(value);
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
      if (typeof value !== 'string') {
        return false;
      }

      return REGEX_ALPHA_NUMERIC_DASH.test(value);
    },
  };
}
