import { ValidationRuleContract } from "../contracts.js";

const macAddressRegex = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressNoColons = /^([0-9a-fA-F]){12}$/;
const macAddressWithHyphen = /^([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressWithSpaces = /^([0-9a-fA-F][0-9a-fA-F]\s){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressWithDots = /^([0-9a-fA-F]{4}).([0-9a-fA-F]{4}).([0-9a-fA-F]{4})$/;

export function macAddress(): ValidationRuleContract {
  return {
    name: "macAddress",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return macAddressRegex.test(value)
        || macAddressWithHyphen.test(value)
        || macAddressWithSpaces.test(value)
        || macAddressWithDots.test(value);
    },
  };
}
