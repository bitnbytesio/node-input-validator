import { alpha } from "../rules/alpha.rule";

test("rules:alpha", function (): void {
  const ruleHandler = alpha().handler;
  expect(ruleHandler("yes")).toBe(true);
  expect(ruleHandler("123")).toBe(false);
});
