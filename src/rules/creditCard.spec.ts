import { creditCard } from "./creditCard.rule";

describe("rules:creditCard", () => {
  test("should pass", () => {
    const ruleHandler = creditCard().handler;
    expect(ruleHandler("4111111111111111")).toBe(true);
    expect(ruleHandler("4111 1111 1111 1111")).toBe(true);
    expect(ruleHandler("5500 0000 0000 0004")).toBe(true);
    expect(ruleHandler("3400 0000 0000 009")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = creditCard().handler;
    expect(ruleHandler("412365")).toBe(false);
  });
});