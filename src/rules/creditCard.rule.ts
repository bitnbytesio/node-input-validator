import { ValidationRuleContract } from "../contracts.js";
import { isCreditCard } from "../utils/borrowed.js";

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
