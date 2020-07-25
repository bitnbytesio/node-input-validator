import { email } from "./email.rule";

describe("rules:email", () => {
  test("should pass", () => {
    const ruleHandler = email().handler;
    expect(ruleHandler("user@example.com")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = email().handler;
    expect(ruleHandler("form@example")).toBe(false);
  });
});
