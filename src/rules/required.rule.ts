import { ValidationRuleContract, ValidatorContract } from "../contracts";

import { reallyEmpty } from "../utils/ops.util";

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
