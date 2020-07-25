
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function gt(
  args: Array<string>,
): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [anotherAttr] = args;

  return {
    name: "gt",
    handler: (value: any, v: ValidatorContract) => {
      const anotherAttrVal = v.attributeValue(anotherAttr);

      return Number(value) > Number(anotherAttrVal);
    },
  };
}

export function gte(
  args: Array<any>,
): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Invalid number of arguments.');
  }

  const [anotherAttr] = args;

  return {
    name: "gte",
    handler: (value: any, v: ValidatorContract) => {
      const [anotherAttr] = args;

      const anotherAttrVal = v.attributeValue(anotherAttr);

      return Number(value) >= Number(anotherAttrVal);
    },
  };
}
