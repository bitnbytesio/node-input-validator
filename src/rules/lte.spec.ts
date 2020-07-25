import { ValidatorLite } from '../mock/validator-lite.mock'

import { lte } from "./lte.rule";

test("rules:lte", function (): void {
  const ruleHandler = lte(["max"]).handler;
  expect(ruleHandler(8, new ValidatorLite({ max: 10 }))).toBe(true);
  expect(ruleHandler(8, new ValidatorLite({ max: 4 }))).toBe(false);
  expect(ruleHandler(8, new ValidatorLite({ max: 8 }))).toBe(true);
});
