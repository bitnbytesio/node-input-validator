import { email } from "./email.rule";

test("rules:email", function (): void {
  const ruleHandler = email().handler;
  expect(ruleHandler("user@example.com")).toBe(true);
  expect(ruleHandler("form@example")).toBe(false);
});
