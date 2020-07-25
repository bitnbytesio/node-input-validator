
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function min(args: Array<any>): ValidationRuleContract {
  return {
    name: "min",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (
        !Number(String(value)) ||
        Number(value) < Number(v.attributeValue(maxNum))
      ) {
        return false;
      }

      return true;
    },
  };
}
