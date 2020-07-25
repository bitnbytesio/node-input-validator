import { ValidationRuleContract } from "../contracts";

export function equals(args: Array<any>): ValidationRuleContract {
  return {
    name: "equals",
    handler: (value: any) => {
      if (value !== args[0]) {
        return false;
      }

      return true;
    },
  };
}
