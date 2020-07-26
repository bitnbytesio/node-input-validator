import { json } from "./json.rule";

test("rules:json", function (): void {
  const ruleHandler = json().handler;
  expect(ruleHandler("[1, 2, 3]")).toBe(true);
  expect(ruleHandler("string")).toBe(false);
});
