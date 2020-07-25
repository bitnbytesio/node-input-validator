
import { hexColor } from "./hexColor.rule";

test("rules:hexColor", function (): void {
  const ruleHandler = hexColor().handler;
  expect(ruleHandler("#FFFFFF")).toBe(true);
  expect(ruleHandler("#000")).toBe(true);
  expect(ruleHandler("f00")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
});
