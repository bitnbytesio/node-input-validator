import { ValidationRuleContract, ValidatorContract } from "../contracts";
import { isHexadecimal } from "../utils/str.util";

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
