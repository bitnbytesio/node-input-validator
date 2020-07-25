import { ValidatorLite } from '../mock/validator-lite.mock'
import { gte } from "./gte.rule";

test("rules:gte", function (): void {
  const ruleHandler = gte(["max"]).handler;
  expect(ruleHandler(8, new ValidatorLite({ max: 5 }))).toBe(true);
  expect(ruleHandler(8, new ValidatorLite({ max: 9 }))).toBe(false);
  expect(ruleHandler(8, new ValidatorLite({ max: 8 }))).toBe(true);
});
