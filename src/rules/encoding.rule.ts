/* istanbul ignore file */

import validator from 'validator';

import { ValidationRuleContract } from "../contracts";

export function ascii(): ValidationRuleContract {
  return {
    name: "ascii",
    handler: (value: any) => {
      return validator.isAscii(String(value));
    },
  };
}

export function json(): ValidationRuleContract {
  return {
    name: "json",
    handler: (value: any) => {
      return validator.isJSON(String(value));
    },
  };
}

export function base64(): ValidationRuleContract {
  return {
    name: "base64",
    handler: (value: any) => {
      return validator.isBase64(String(value));
    },
  };
}
