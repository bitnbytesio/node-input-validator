import { ValidationRuleContract } from "../contracts";

export function different(args: Array<any>): ValidationRuleContract {
  return {
    name: "different",
    handler: (value: any, v: any) => {
      if (!args.length) {
        throw new Error("Invalid number of arguments");
      }

      const [otherInput] = args;

      const otherValue = v.attributeValue(otherInput);

      if (otherValue === value) {
        return false;
      }

      return true;
    },
  };
}
