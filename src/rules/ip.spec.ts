
import { Messages } from "../messages/index.js";
import { ip } from "./ip.rule.js";

test("rules:ip", () => {
  const ruleHandler = ip().handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
  expect(ruleHandler(undefined)).toBe(false);
});


test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('ip');
});
