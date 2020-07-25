import { ValidatorLite } from '../mock/validator-lite.mock'

import { max } from "./max.rule";

test("rules:max", function (): void {
  const ruleHandler = max(["max"]).handler;
  expect(ruleHandler("10", new ValidatorLite({ max: "20" }))).toBe(true);
  expect(ruleHandler(10, new ValidatorLite({ max: "20" }))).toBe(true);
  expect(ruleHandler("30", new ValidatorLite({ max: "20" }))).toBe(false);
  expect(
    ruleHandler("Harcharn Singh", new ValidatorLite({ max: "20" }))).toBe(false);
});
