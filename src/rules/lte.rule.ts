
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function lte(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "lte",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.attributeValue(anotherAttr);

      if (Number(value) <= Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
