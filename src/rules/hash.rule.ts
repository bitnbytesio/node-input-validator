import validator from 'validator';

import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function hash(args: Array<any>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [algo] = args;

  return {
    name: "hash",
    handler: (value: any) => {
      return validator.isHash(String(value), algo);
    },
  };
}
