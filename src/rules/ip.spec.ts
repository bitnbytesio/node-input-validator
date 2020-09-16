
import { Messages } from "../messages";
import { ip } from "./ip.rule";

test("rules:ip", () => {
  const ruleHandler = ip().handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
});


test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('ip');
});
