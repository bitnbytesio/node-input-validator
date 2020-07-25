
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function same(
  args: Array<string>,
): ValidationRuleContract {
  return {
    name: "same",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      if (value === v.attributeValue(anotherAttr)) {
        return true;
      }

      return false;
    },
  };
}
