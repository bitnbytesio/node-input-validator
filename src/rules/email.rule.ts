import { ValidationRuleContract } from "../contracts.js";
import { isEmail } from "../utils/borrowed.js";

export function email(): ValidationRuleContract {
  return {
    name: "email",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isEmail(value);
    },
  };
}
