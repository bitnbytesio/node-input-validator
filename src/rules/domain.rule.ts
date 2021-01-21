import { ValidationRuleContract } from "../contracts";
import { isDomain } from "../utils/borrowed";

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
