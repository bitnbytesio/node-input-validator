import { ValidatorLite } from '../mock/validator-lite.mock'

import { regex } from "./regex.rule";

test("rules:regex", function (): void {
  const ruleHandler = regex(["regex"]).handler;
  expect(
    ruleHandler(
      "abc",
      new ValidatorLite({ regex: "[abc]" }),
    )).toBe(true),
    expect(
      ruleHandler(
        "xyz",
        new ValidatorLite({ regex: "[abc]" }),
      )).toBe(false);
});
