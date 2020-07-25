import { ValidatorLite } from '../mock/validator-lite.mock'

import { lt } from "./lt.rule";

test("rules:lt", function (): void {
  const ruleHandler = lt(["max"]).handler;
  expect(ruleHandler(8, new ValidatorLite({ max: 10 }))).toBe(true);
  expect(ruleHandler(8, new ValidatorLite({ max: 4 }))).toBe(false);
});
