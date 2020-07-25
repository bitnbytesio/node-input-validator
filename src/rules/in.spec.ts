import { ValidatorLite } from '../mock/validator-lite.mock'

import { _in } from "./in.rule";

test("rules:in", function (): void {
  const ruleHandler = _in(["in"]).handler;
  expect(
    ruleHandler(
      "public",
      new ValidatorLite({ in: "private,public,draft" }),
    )).toBe(true);

  expect(
    ruleHandler(
      "public",
      new ValidatorLite({ in: "public" }),
    )).toBe(true);

  expect(
    ruleHandler(
      "draft",
      new ValidatorLite({ in: "public,private" }),
    )).toBe(false);
});
