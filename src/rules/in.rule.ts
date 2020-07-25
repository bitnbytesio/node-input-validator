
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function _in(args: Array<any>): ValidationRuleContract {
  return {
    name: "in",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;
      if (v.attributeValue(anotherAttr).indexOf(String(value)) < 0) {
        return false;
      }

      return true;
    },
  };
}
