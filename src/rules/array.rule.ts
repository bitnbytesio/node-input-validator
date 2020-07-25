import { ValidationRuleContract } from "../contracts";

export function array(): ValidationRuleContract {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
}

export function arrayUnique(): ValidationRuleContract {
  return {
    name: "arrayUnique",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      return (new Set(value)).size === value.length;
    },
  };
}

export function arrayUniqueObjects(
  args: Array<any>,
): ValidationRuleContract {
  return {
    name: "arrayUniqueObjects",
    handler: (value: any) => {
      if (!Array.isArray(value)) {
        return false;
      }

      const result = new Set(value.map((o) => {
        let output = "";

        for (const attr of args) {
          output += o[attr];
        }

        return output;
      }));
      return result.size === value.length;
    },
  };
}
