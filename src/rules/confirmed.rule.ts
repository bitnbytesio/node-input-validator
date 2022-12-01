import { ValidationRuleContract, ValidatorContract } from "../contracts.js";

export function confirmed(
  args: Array<string> = [],
): ValidationRuleContract {
  return {
    name: "confirmed",
    handler: (value: any, v: ValidatorContract, attrName: string) => {
      if (value === v.attributeValue(`${attrName}Confirmation`)) {
        return true;
      }

      return false;
    },
  };
}
