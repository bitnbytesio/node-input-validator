import { ValidatorLite } from '../mock/validator-lite.mock'

import { min } from "./min.rule";

test("rules:min", function (): void {
  const ruleHandler = min(["min"]).handler;
  expect(ruleHandler("10", new ValidatorLite({ min: "8" }))).toBe(true);
  expect(ruleHandler(10, new ValidatorLite({ min: "8" }))).toBe(true);
  expect(ruleHandler("30", new ValidatorLite({ min: "40" }))).toBe(false);
  expect(
    ruleHandler("Harcharn Singh", new ValidatorLite({ min: "20" }))).toBe(false);
});
