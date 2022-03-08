import { Rules } from "./index";

import { Validator } from './validator';

describe(
  "Validator:validate using sometimes and nullable",
  function (): void {
    test(
      "should pass, with given string notation rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { nullable: null },
          { nullable: 'string|email|nullable', sometimes: 'string|email|sometimes' },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail, with given string notation rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { nullable: 'test', sometimes: null },
          { nullable: 'string|email|nullable', sometimes: 'string|email|sometimes' },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });

    test(
      "should pass, with given rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { nullable: null },
          {
            nullable: [Rules.string(), Rules.email(), Rules.nullable()],
            sometimes: [Rules.string(), Rules.email(), Rules.sometimes()]
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should pass, with mixed rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { nullable: null },
          {
            // @ts-ignore
            nullable: [Rules.string(), 'email', Rules.nullable()],
            // @ts-ignore
            sometimes: [Rules.string(), Rules.email(), 'sometimes']
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });


    test(
      "should fail, with given rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          { nullable: 'test', sometimes: null },
          {
            nullable: [Rules.string(), Rules.email(), Rules.nullable()],
            sometimes: [Rules.string(), Rules.email(), Rules.sometimes()]
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });
  },
);


describe(
  "Validator:validate wildcard using sometimes and nullable",
  function (): void {
    test(
      "should pass, with given string notation rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          {
            products: {
              name: "Node",
              attributes: null,
            },
          },
          {
            products: 'object',
            'products.name': 'sometimes|string',
            'products.attributes': 'nullable|array',
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(true);
      });

    test(
      "should fail, with given string notation rules",
      async function (): Promise<void> {
        // should pass, as value is as per given rule
        const v = new Validator(
          {
            products: {
              name: undefined,
              attributes: 'expected array',
            },
          },
          {
            products: 'object',
            'products.name': 'sometimes|string',
            'products.attributes': 'nullable|array',
          },
        );
        const passed: boolean = await v.validate();
        expect(passed).toBe(false);
      });
  },
);
