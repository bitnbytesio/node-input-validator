import { ValidatorLite } from '../mock/validator-lite.mock'

import { notContains } from "./notContains.rule";

test("rules:notContains", function (): void {
  const ruleHandler = notContains(["notContains"]).handler;
  expect(
    ruleHandler(
      "This library is awesome.",
      new ValidatorLite({ notContains: "package" }),
    )).toBe(true);
  expect(
    ruleHandler(
      "Yes, Deno is awesome",
      new ValidatorLite({ notContains: "Yes" }),
    )).toBe(false);
});
