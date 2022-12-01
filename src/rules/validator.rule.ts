/* istanbul ignore file */

let validatorJs: any;

try {
  validatorJs = require('validator');
} catch (e) {
  /** ignore */
}

import { ValidationRuleContract } from "../contracts.js";

/**
 * @since v5
 * @param args 
 */
export function validator(
  name: string,
  args: Array<any> = [],
): ValidationRuleContract {
  // @ts-ignore
  if (typeof validatorJs[name] !== 'function') {
    throw new Error(`Rule ${name} does not exists on validator.js.`);
  }

  if (Array.isArray(name)) {
    [name, ...args] = name;
  }

  const rulename = name.replace('is', '').toLowerCase()

  return {
    name: rulename,
    handler: (value: any) => {
      // @ts-ignore
      return validatorJs[name](value + "", ...args);
    },
  };
}
