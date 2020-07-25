import { ValidationRuleContract } from "../contracts";

export function accepted(
  args: Array<string> = ["true", "1", "yes", "on"],
): ValidationRuleContract {
  return {
    name: "accepted",
    handler: (value: any) => {
      if (args.indexOf(String(value)) >= 0) {
        return true;
      }
      return false;
    },
  };
}
