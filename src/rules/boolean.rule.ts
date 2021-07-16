import { ValidationRuleContract } from "../contracts";

export function booleanStr(): ValidationRuleContract {
  const args: Array<string> = ["true", "false"];
  return {
    name: "booleanStr",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}

export function booleanInt(): ValidationRuleContract {
  const args: Array<Number> = [0, 1];
  return {
    name: "booleanInt",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}

export function booleanStrict(): ValidationRuleContract {
  const args: Array<boolean> = [true, false];
  return {
    name: "booleanStrict",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}

// /**
//  * @deprecated Since version 5. 
//  * Use booleanStrict,booleanStr,booleanInt instead.
//  * @param args 
//  */
export function boolean(
  args: Array<any> = [true, false, 0, 1, "true", "false", "0", "1"],
): ValidationRuleContract {
  // console.warn("Rule boolean has be deprecated, please use booleanStrict,booleanStr,booleanInt instead.");
  return {
    name: "boolean",
    handler: (value: any) => {
      if (args.indexOf(value) >= 0) {
        return true;
      }
      return false;
    },
  };
}
