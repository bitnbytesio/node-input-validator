
import { Messages } from "../messages/index.js";
import { macAddress } from "./macAddress.rule.js";

test("rules:macAddress", function (): void {
  const ruleHandler = macAddress().handler;
  expect(ruleHandler("00:14:22:01:23:45")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
  expect(ruleHandler(null)).toBe(false);
});
test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('macAddress');
});
