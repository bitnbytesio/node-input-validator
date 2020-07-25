
import { integer } from "./integer.rule";

test("rules:integer", function (): void {
  const ruleHandler = integer().handler;
  expect(ruleHandler("12")).toBe(true);
  expect(ruleHandler(12)).toBe(true);
  expect(ruleHandler("12.5")).toBe(false);
  expect(ruleHandler("draft")).toBe(false);
});
