import { ValidationRuleContract, ValidatorContract } from "../contracts.js";

export function any(args: Array<string>): ValidationRuleContract {
  return {
    name: 'any',
    handler: (_: any, v: ValidatorContract) => {
      // @ts-ignore
      const values = v.notationVals;

      for (const k in args) {
        const field = args[k];

        if (values[field]) {
          return true;
        }
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
        ruleName: 'any',
        attrName: '*',
        attrValue: values,
        ruleArgs: args,
      });

      return false;
    },
  };
};
