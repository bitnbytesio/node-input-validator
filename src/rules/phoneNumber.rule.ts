import { ValidationRuleContract } from "../contracts.js";

const regex = /^(\+?\d{1,3})?\d{7,10}$/;

export function phoneNumber(args: Array<string> = []): ValidationRuleContract {
  return {
    name: "phoneNumber",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return regex.test(value);
    },
  };
}
