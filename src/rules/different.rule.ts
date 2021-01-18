import { ValidationRuleContract } from "../contracts";

export function different(args: Array<any>): ValidationRuleContract {
  if (!args.length) {
    throw new Error("Invalid number of arguments.");
  }

  return {
    name: "different",
    handler: (value: any, v: any) => {
      const [otherInput] = args;

      const otherValue = v.attributeValue(otherInput);

      if (otherValue === value) {
        return false;
      }

      return true;
    },
  };
}
