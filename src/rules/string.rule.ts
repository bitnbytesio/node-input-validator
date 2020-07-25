import { ValidationRuleContract } from "../contracts";

export function string(): ValidationRuleContract {
  return {
    name: "string",
    handler: (value: any) => {
      return typeof value === "string";
    },
  };
}
