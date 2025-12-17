/* istanbul ignore file */

import { ValidationRuleContract } from "../contracts.js";

type ValidatorJsModule = Record<string, (...args: unknown[]) => boolean>;

let validatorJs: ValidatorJsModule | null = null;

try {
  validatorJs = require('validator');
} catch (e) {
  /** ignore */
}

/**
 * @since v5
 * @param args
 */
export function validator(
  name: string,
  args: Array<unknown> = [],
): ValidationRuleContract {
  if (!validatorJs) {
    throw new Error('validator.js is not installed. Please install it with: npm install validator');
  }

  if (typeof validatorJs[name] !== 'function') {
    throw new Error(`Rule ${name} does not exist on validator.js.`);
  }

  if (Array.isArray(name)) {
    [name, ...args] = name;
  }

  const rulename = name.replace('is', '').toLowerCase()

  return {
    name: rulename,
    handler: (value: unknown) => {
      return validatorJs![name](value + "", ...args);
    },
  };
}
