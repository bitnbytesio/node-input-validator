import { ValidatorLite } from '../mock/validator-lite.mock'

import { maxLength } from "./max-length.rule";

test("rules:maxLength", function (): void {
  const ruleHandler = maxLength(["maxLength"]).handler;
  expect(
    ruleHandler("uname", new ValidatorLite({ maxLength: "10" }))).toBe(true);
  expect(
    ruleHandler("uname", new ValidatorLite({ maxLength: "4" }))).toBe(false);
});
