import { ValidationRuleContract } from "../contracts.js";

export function nullable(): ValidationRuleContract {
  return {
    name: "nullable",
    handler: (value: any) => {
      if (value != null) {
        return -1
      }
      return true;
    },
  };
}

export function sometimes(): ValidationRuleContract {
  return {
    name: "sometimes",
    handler: (value: any, v: any, name: string, { inputs }: any) => {
      if (inputs[name] != undefined) {
        return -1
      }
      return true;
    },
  };
}
