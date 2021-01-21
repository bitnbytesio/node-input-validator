import { Messages } from "../messages";
import { email } from "./email.rule";

describe("rules:email", () => {
  test("should pass", () => {
    const ruleHandler = email().handler;
    expect(ruleHandler("user@example.com")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = email().handler;
    expect(ruleHandler("form@example")).toBe(false);
    expect(ruleHandler(["array"])).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('email');
  });
});
