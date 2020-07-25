import { digits } from "./digits.rule";

test("rules:digits", function (): void {
  const ruleHandler = digits(["5"]).handler;
  expect(ruleHandler(12345)).toBe(true);
  expect(ruleHandler("12345")).toBe(true);
  expect(ruleHandler(123)).toBe(false);
  expect(ruleHandler(123456)).toBe(false);
  expect(ruleHandler("123")).toBe(false);
  expect(ruleHandler("123456")).toBe(false);
});
