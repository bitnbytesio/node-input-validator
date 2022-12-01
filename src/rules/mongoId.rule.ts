import { ValidationRuleContract, ValidatorContract } from "../contracts.js";
import { isHexadecimal } from "../utils/str.util.js";

export function mongoId(): ValidationRuleContract {
  return {
    name: "mongoId",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isHexadecimal(value) && value.length === 24;
    },
  };
}
