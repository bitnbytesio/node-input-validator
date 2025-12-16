import { ValidationRuleContract, ValidatorContract } from "../contracts.js";

export function regex(args: Array<any>): ValidationRuleContract {
  return {
    name: "regex",
    handler: (value: any, v: ValidatorContract) => {
      const [pattern] = args;
      const patternValue = v.attributeValue(pattern);

      // Escape pattern if RegExp.escape is available (ES2024+)
      const escapedPattern = typeof (RegExp as any).escape === 'function'
        ? (RegExp as any).escape(patternValue)
        : patternValue;

      const regexp = new RegExp(escapedPattern);

      if (!regexp.test(value)) {
        return false;
      }

      return true;
    },
  };
}
