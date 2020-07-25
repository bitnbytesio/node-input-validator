
import { hex } from "./hex.rule";

test("rules:hex", function (): void {
  const ruleHandler = hex().handler;
  expect(ruleHandler("6e6f646520696e7075742076616c696461746f72")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
});
