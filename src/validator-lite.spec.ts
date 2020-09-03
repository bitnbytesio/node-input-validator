import { accepted } from "./rules/accepted.rule";
import { required } from "./rules/required.rule";
import { alpha } from "./rules/alpha.rule";

import { ValidatorLite, registerRules } from './validator-lite';

const Rules = registerRules({
  accepted,
  alpha,
  required,
})

describe(
  "ValidatorLite:validate",
  function (): void {
    test(
      "should pass, with string notation rule",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new ValidatorLite(
          { tandc: "yes" },
          { tandc: 'accepted' },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail, as rule is missing",
      function (): void {
        expect(() => {
          const v = new ValidatorLite(
            { tandc: "yes" },
            { tandc: 'string' },
          );
          // const passed: boolean = await v.validate();
          throw new Error('It should fail.');
        }).toThrowError(new Error('Rule string does not exists.'));
      });

    test(
      "should pass, value is as per given rule",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new ValidatorLite(
          { tandc: "yes" },
          { tandc: [Rules.accepted()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail, value is empty string & required rule is present",
      async function (): Promise<void> {
        const v = new ValidatorLite(
          { tandc: "" },
          { tandc: [Rules.required(), Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });

    test(
      "should fail, implicit rule position does not matter",
      async function (): Promise<void> {
        const v = new ValidatorLite(
          { tandc: "" },
          { tandc: [Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });
  },
);
