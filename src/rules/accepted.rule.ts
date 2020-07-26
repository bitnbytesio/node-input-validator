import { ValidationRuleContract } from "../contracts";

/**
 * The field under validation must be yes, on, 1, or true. 
 * This is useful for validating "Terms of Service" acceptance.
 * @param {Array<string>} args seeds
 */
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
