
import { object } from "./object.rule";

test("rules:object", function (): void {
  const ruleHandler = object().handler;
  expect(ruleHandler([])).toBe(false);
  expect(ruleHandler({})).toBe(true);
  expect(ruleHandler(1)).toBe(false);
  expect(ruleHandler("Test")).toBe(false);
  expect(ruleHandler(true)).toBe(false);
});
