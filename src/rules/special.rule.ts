import { ValidationRuleContract } from "../contracts";

export function nullable(): ValidationRuleContract {
  return {
    name: "nullable",
    handler: (value: any) => {
      return true;
    },
  };
}

export function sometimes(): ValidationRuleContract {
  return {
    name: "sometimes",
    handler: (value: any) => {
      return true;
    },
  };
}
