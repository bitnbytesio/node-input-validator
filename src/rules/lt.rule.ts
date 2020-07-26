import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function lt(
  args: Array<string>,
): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [anotherAttr] = args;

  return {
    name: "lt",
    handler: (value: any, v: ValidatorContract) => {
      const anotherAttrVal = v.attributeValue(anotherAttr);
      return Number(value) < Number(anotherAttrVal);
    },
  };
}
