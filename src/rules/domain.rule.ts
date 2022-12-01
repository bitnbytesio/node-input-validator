import { ValidationRuleContract } from "../contracts.js";
import { isDomain } from "../utils/borrowed.js";

export function domain(): ValidationRuleContract {
  return {
    name: "domain",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isDomain(value);
    },
  };
}
