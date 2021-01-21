import { ValidationRuleContract } from "../contracts";
import { isEmail } from "../utils/borrowed";

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
