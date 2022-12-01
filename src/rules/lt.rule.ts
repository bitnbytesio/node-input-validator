import { ValidationRuleContract, ValidatorContract } from "../contracts.js";

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

export function lte(
  args: Array<any>,
): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [anotherAttr] = args;

  return {
    name: "lte",
    handler: (value: any, v: ValidatorContract) => {
      const anotherAttrVal = v.attributeValue(anotherAttr);

      return Number(value) <= Number(anotherAttrVal);
    },
  };
}
