import { ValidationRuleContract, ValidatorContract } from "../contracts";
import { reallyEmpty } from "../utils/ops.util";

/**
 * The field under validation must be yes, on, 1, or true. 
 * This is useful for validating "Terms of Service" acceptance.
 * @param {Array<string>} args seeds
 */
export function accepted(
  args: Array<string> = ["true", "1", "yes", "on"],
): ValidationRuleContract {
  return {
    name: "accepted",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}


export function acceptedIf(
  args: Array<string>,
  acceptedValues: Array<string> = ["true", "1", "yes", "on"],
): ValidationRuleContract {
  const argsLen = args.length;

  if (
    !args
    || argsLen < 2
    || argsLen % 2 !== 0
  ) {
    throw new Error(`Invalid number of arguments.`);
  }

  return {
    name: "acceptedIf",
    handler: (value: any, v: ValidatorContract) => {
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

      return (required && args.indexOf(value) < 0) ? false : true;
    },
  };
}
