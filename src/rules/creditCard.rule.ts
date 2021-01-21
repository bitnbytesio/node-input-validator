import { ValidationRuleContract } from "../contracts";
import { isCreditCard } from "../utils/borrowed";

export function creditCard(): ValidationRuleContract {
  return {
    name: "creditCard",
    handler: (value: any): boolean => {
      if (typeof value !== 'string') {
        return false;
      }
      return isCreditCard(value);
    },
  };
}
