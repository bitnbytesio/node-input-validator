
import { ValidationRuleContract, ValidatorContract } from "../contracts";

export function object(): ValidationRuleContract {
  return {
    name: "object",
    handler: (value: any) => {
      return (!!value) && (value.constructor === Object);
    },
  };
}
