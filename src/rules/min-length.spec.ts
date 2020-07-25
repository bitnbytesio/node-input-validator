import { ValidatorLite } from '../mock/validator-lite.mock'

import { minLength } from "./min-length.rule";

test("rules:minLength", function (): void {
  const ruleHandler = minLength(["minLength"]).handler;
  expect(
    ruleHandler("uname", new ValidatorLite({ minLength: "4" }))).toBe(true);
  expect(
    ruleHandler("uname", new ValidatorLite({ minLength: "10" }))).toBe(false);
});
