
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function maxLength(args: Array<any>): ValidationRuleContract {
  return {
    name: "maxLength",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (value.toString().length > parseInt(v.attributeValue(maxNum))) {
        return false;
      }

      return true;
    },
  };
}
