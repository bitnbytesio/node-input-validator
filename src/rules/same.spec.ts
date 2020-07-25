import { ValidatorLite } from '../mock/validator-lite.mock'

import { same } from "./same.rule";

test("rules:same", function (): void {
  const ruleHandler = same(["confirmPassword"]).handler;
  expect(
    ruleHandler("123456", new ValidatorLite({ confirmPassword: "123456" }))).toBe(true);
  expect(
    ruleHandler("123456", new ValidatorLite({ confirmPassword: "123123" }))).toBe(false);
});
