
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function gte(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "gte",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.attributeValue(anotherAttr);

      if (Number(value) >= Number(anotherAttrVal)) {
        return true;
      }

      return false;
    },
  };
}
