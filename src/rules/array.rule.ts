import { ValidationRuleContract } from "../contracts";

// This file is the perfect example of when to place multiple rules in same file.
// All rules in this file have common check ie. isArray and on top of that 
// 2 of them have unique check.

/**
 * The field under validation must be array.
 */
export function array(): ValidationRuleContract {
  return {
    name: "array",
    handler: (value: any) => {
      return Array.isArray(value);
    },
  };
}

/**
 * The field under validation must be array of unique values.
 * No need to use array rule. This rule will take care of that.
 */
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

/**
 * The field under validation must be array and should have objects with unique attributes as per seed.
 * No need to use array rule. This rule will take care of that.
 * @param args seeds
 */
export function arrayUniqueObjects(
  args: Array<string>,
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
