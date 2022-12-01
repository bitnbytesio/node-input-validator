import {
  ValidationRuleContract,
  ValidatorContract,
} from "../contracts.js";

export function all(args: Array<string>): ValidationRuleContract {
  return {
    name: 'all',
    handler: (_: any, v: ValidatorContract) => {
      // @ts-ignore
      const values = v.notationVals;

      let result = true;

      for (const k in args) {
        if (values[args[k]] === undefined) {
          result = false;
          break;
        }
      }

      if (result) {
        return true;
      }

      args.forEach((attrName) => {
        const attrValue = v.attributeValue(attrName);
        v.createAttributeError({
          ruleName: 'required',
          attrName,
          attrValue,
          ruleArgs: args,
        });
      });

      v.createAttributeError({
        ruleName: 'all',
        attrName: '*',
        attrValue: values,
        ruleArgs: args,
      });

      return false;
    },
  };
};
