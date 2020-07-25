
import { hash } from "./hash.rule";

test("rules:hash", function (): void {
  const ruleHandler = hash(["md5"]).handler;
  expect(ruleHandler("46f8fb7d635cb71beafe8fe580c56164")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
});
