import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function same(
  args: Array<string>,
): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [anotherAttr] = args;

  return {
    name: "same",
    handler: (value: any, v: ValidatorContract) => {
      if (value === v.attributeValue(anotherAttr)) {
        return true;
      }

      return false;
    },
  };
}
