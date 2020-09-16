
import { Messages } from "../messages";
import { phoneNumber } from "./phoneNumber.rule";

test("rules:phoneNumber", function (): void {
  const ruleHandler = phoneNumber().handler;
  expect(ruleHandler("+918699987073")).toBe(true);
  expect(ruleHandler("+1-541-754-3010")).toBe(true);
  expect(ruleHandler("draft")).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('phoneNumber');
});
