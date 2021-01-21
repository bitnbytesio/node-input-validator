import { ValidationRuleContract } from "../contracts";
import { isHexadecimal } from "../utils/str.util";

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

export function hex(): ValidationRuleContract {
  return {
    name: "hex",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isHexadecimal(value);
    },
  };
}

export function hexColor(): ValidationRuleContract {
  return {
    name: "hexColor",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return hexcolor.test(value);
    },
  };
}
