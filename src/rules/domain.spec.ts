import { Messages } from "../messages/index.js";
import { domain } from "./domain.rule.js";

describe("rules:domain", function (): void {
  test("should pass", function (): void {
    const ruleHandler = domain().handler;
    expect(ruleHandler("example.com")).toBe(true);
    expect(ruleHandler("www.example.com")).toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = domain().handler;
    expect(ruleHandler("http://www.example.com")).toBe(false);
    expect(ruleHandler("localhost")).toBe(false);
    expect(ruleHandler(["localhost"])).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('domain');
  });
});
