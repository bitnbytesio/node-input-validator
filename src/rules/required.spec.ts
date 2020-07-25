import { required } from "../rules/required.rule";

test("rules:required", function (): void {
  const ruleHandler = required().handler;
  expect(ruleHandler("yes")).toBe(true);
  expect(ruleHandler("true")).toBe(true);
  expect(ruleHandler(true)).toBe(true);
  expect(ruleHandler(false)).toBe(true);
  expect(ruleHandler("0")).toBe(true);
  expect(ruleHandler(0)).toBe(true);
  expect(ruleHandler("")).toBe(false);
  expect(ruleHandler()).toBe(false);
  expect(ruleHandler(null)).toBe(false);
});
