import { ValidatorLite } from '../mock/validator-lite.mock'

import { notIn } from "./notIn.rule";

test("rules:notIn", function (): void {
  const ruleHandler = notIn(["notIn"]).handler;
  expect(
    ruleHandler(
      "public",
      new ValidatorLite({ notIn: "private,draft" }),
    )).toBe(true),
    expect(
      ruleHandler(
        "draft",
        new ValidatorLite({ notIn: "private,draft" }),
      )).toBe(false);
});
