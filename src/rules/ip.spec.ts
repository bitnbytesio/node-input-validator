
import { ip } from "./ip.rule";

test("rules:ip", function (): void {
  const ruleHandler = ip().handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
});
