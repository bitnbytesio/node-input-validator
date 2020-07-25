
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function max(args: Array<any>): ValidationRuleContract {
  return {
    name: "max",
    handler: (value: any, v: ValidatorContract) => {
      const [maxNum] = args;

      if (
        !Number(String(value)) ||
        Number(value) > Number(v.attributeValue(maxNum))
      ) {
        return false;
      }

      return true;
    },
  };
}
