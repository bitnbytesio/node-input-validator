import { ValidationRuleContract } from "../contracts";

export function mime(args: Array<string>, trust: boolean = false): ValidationRuleContract {
  return {
    name: "mime",
    handler: (value: any) => {

    },
  };
}
