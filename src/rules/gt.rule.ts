
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function gt(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "gt",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.attributeValue(anotherAttr);

      if (Number(value) > Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
