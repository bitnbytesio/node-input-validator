
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function lt(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "lt",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.attributeValue(anotherAttr);

      if (Number(value) < Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
