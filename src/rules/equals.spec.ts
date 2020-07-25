import { equals } from "./equals.rule";

test("rules:equals", function (): void {
  const ruleHandler = equals(["yes"]).handler;
  expect(ruleHandler("yes")).toBe(true);
  expect(ruleHandler("Yes, Deno is awesome")).toBe(false);
});
