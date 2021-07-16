import { Rules } from "./index";

import { Validator } from './validator';

import { messages } from './messages/en-US.messages';
import { messageParser } from './utils/message-parser.util';

describe(
  "Validator:validate",
  function (): void {
    test(
      "should pass, value is as per given rule",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { tandc: "yes" },
          { tandc: [Rules.accepted()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test('should use message if available, validator.js', async () => {
      // should pass, as value is as per given rule
      const v = new Validator(
        { email: "email" },
        { email: 'validator:isEmail' },
      );
      const passed: boolean = await v.validate();
      expect(passed).toBe(false);
      // @ts-ignore
      expect(v.errors.email.message).toBe(messageParser({
        message: messages.email,
        ruleArgs: ['isEmail'],
        attrName: 'email',
        ruleName: 'validator',
      }));
    });

    test(
      "should fail, and return error message with nicename",
      async function (): Promise<void> {
        // should fail as value is not as per given rule
        const vF = new Validator(
          { tandc: "no" },
          { tandc: [Rules.accepted()] },
        );
        vF.niceNames({
          tandc: 'Terms & Conditions',
        });
        const passedF: boolean = await vF.validate();
        expect(passedF).toBe(false);
        expect(vF.getErrors()).toMatchObject({
          tandc: {
            rule: 'accepted',
            message: vF.createAttributeErrorMessage({
              attrName: 'tandc',
              ruleName: 'accepted',
              attrValue: 'no',

            }),
          }
        });
      });

    test(
      "should pass, value is empty string & there is no required rule",
      async function (): Promise<void> {
        // should pass, value not provide
        // so validator should skip this rule
        // as there is no required rule on this attribute
        const vFe = new Validator(
          { tandc: "" },
          { tandc: [Rules.alpha()] },
        );
        const passedFe: boolean = await vFe.validate();
        expect(passedFe).toBe(true);
      });

    test(
      "should pass, value is undefined & there is no required rule",
      async function (): Promise<void> {
        const v = new Validator(
          { tandc: undefined },
          { tandc: [Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail, value is empty string & required rule is present",
      async function (): Promise<void> {
        const v = new Validator(
          { tandc: "" },
          { tandc: [Rules.required(), Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });

    test(
      "should fail, implicit rule position does not matter",
      async function (): Promise<void> {
        const v = new Validator(
          { tandc: "" },
          { tandc: [Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });
  },
);

describe(
  "Validator:validate:nested:simple object with depth level 1",
  function (): void {
    test(
      "should pass",
      async function (): Promise<void> {
        const v = new Validator(
          { user: { name: "Nodejs" } },
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail",
      async function (): Promise<void> {
        const v = new Validator(
          { user: { name: "Node.js" } },
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.name"].rule).toBe("alpha");
      });

    test(
      "should fail when no input",
      async function (): Promise<void> {
        const v = new Validator(
          {},
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.name"].rule).toBe("required");
      });

    test(
      "should fail with value undefined",
      async function (): Promise<void> {
        const v = new Validator(
          { user: undefined },
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.name"].rule).toBe("required");
      });

    test(
      "should pass with value undefined and no required rule",
      async function (): Promise<void> {
        const v = new Validator(
          { user: undefined },
          { "user.name": [Rules.string(), Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail with invalid value other then object data type",
      async function (): Promise<void> {
        const v = new Validator(
          { user: 'test' },
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.name"].rule).toBe("required");
      });

    test(
      "should pass with invalid value and no required rule",
      async function (): Promise<void> {
        const v = new Validator(
          { user: 'test' },
          { "user.name": [Rules.string(), Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail with empty object as value of attribute",
      async function (): Promise<void> {
        const v = new Validator(
          { user: {} },
          { "user.name": [Rules.string(), Rules.alpha(), Rules.required()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.name"].rule).toBe("required");
      });

    test(
      "should pass with empty object as value of attribute and no required rule",
      async function (): Promise<void> {
        const v = new Validator(
          { user: {} },
          { "user.name": [Rules.string(), Rules.alpha()] },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });
  });

describe(
  "Validator:validate:nested: object with depth level 3",
  function (): void {
    test(
      "should pass",
      async function (): Promise<void> {
        // check 3 level nesting
        let v = new Validator(
          { user: { name: "Node", address: { city: "rajpura" } } },
          {
            "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      },
    );

    test(
      "should fail with empty object as value",
      async function (): Promise<void> {
        // check 3 level nesting
        let v = new Validator(
          { user: { name: "Node", address: {} } },
          {
            "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.address.city"].rule).toBe("required");
      },
    );

    test(
      "should fail with missing object attribute",
      async function (): Promise<void> {
        // check 3 level nesting
        let v = new Validator(
          { user: { name: "Node" } },
          {
            "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
        // @ts-ignore
        expect(v.errors["user.address.city"].rule).toBe("required");
      },
    );
  });


describe(
  "Validator:validate:wild nesting",
  function (): void {
    test(
      "should pass",
      async function (): Promise<void> {
        const v = new Validator(
          {
            products: {
              name: "Node",
              attributes: [
                {
                  colors: ['red'],
                },
              ],
            },
          },
          {
            "products.name": [Rules.string(), Rules.alpha(), Rules.required()],
            "products.attributes.*.colors": [Rules.arrayUnique(), Rules.required()],
            "products.attributes.*.colors.*": [
              Rules.string(),
              Rules.required(),
            ],
          },
        );

        // @ts-ignore
        // console.log(v.parsedRulesCollection, JSON.stringify(v.inputs, null, 2));

        const passed: boolean = await v.validate();
        expect(passed).toBe(true);

        //throw v.getErrors();
      },
    );
  });
