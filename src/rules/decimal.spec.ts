import { decimal } from "./decimal.rule";

test("rules:decimal", function (): void {
  const ruleHandler = decimal().handler;
  expect(ruleHandler("12.50")).toBe(true);
  expect(ruleHandler(12.55)).toBe(true);
  expect(ruleHandler(12)).toBe(true);
  expect(ruleHandler(0)).toBe(true);
  expect(ruleHandler("0")).toBe(true);
  expect(ruleHandler("abc")).toBe(false);
});
