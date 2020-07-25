
import { numeric } from "./numeric.rule";

test("rules:numeric", function (): void {
  const ruleHandler = numeric().handler;
  expect(ruleHandler("12")).toBe(true);
  expect(ruleHandler(12)).toBe(true);
  expect(ruleHandler("12.5")).toBe(true);
  expect(ruleHandler(12.5)).toBe(true);
  expect(ruleHandler("draft")).toBe(false);
});
