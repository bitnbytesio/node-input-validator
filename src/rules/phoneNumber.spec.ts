
import { Messages } from "../messages/index.js";
import { phoneNumber } from "./phoneNumber.rule.js";

test("rules:phoneNumber", function (): void {
  const ruleHandler = phoneNumber().handler;
  expect(ruleHandler("+918699987073")).toBe(true);
  expect(ruleHandler("+15417543010")).toBe(true);
  expect(ruleHandler("draft")).toBe(false);
  expect(ruleHandler(null)).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('phoneNumber');
});
