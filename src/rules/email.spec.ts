import { Messages } from "../messages/index.js";
import { email } from "./email.rule.js";

describe("rules:email", () => {
  const ruleHandler = email().handler;

  describe("valid emails", () => {
    test("should pass simple email", () => {
      expect(ruleHandler("user@example.com")).toBe(true);
    });

    test("should pass with subdomain", () => {
      expect(ruleHandler("user@mail.example.com")).toBe(true);
      expect(ruleHandler("user@sub.domain.example.com")).toBe(true);
    });

    test("should pass with plus sign", () => {
      expect(ruleHandler("user+tag@example.com")).toBe(true);
    });

    test("should pass with dots in local part", () => {
      expect(ruleHandler("first.last@example.com")).toBe(true);
      expect(ruleHandler("first.middle.last@example.com")).toBe(true);
    });

    test("should pass with numbers", () => {
      expect(ruleHandler("user123@example.com")).toBe(true);
      expect(ruleHandler("123user@example.com")).toBe(true);
    });

    test("should pass with special characters", () => {
      expect(ruleHandler("user-name@example.com")).toBe(true);
      expect(ruleHandler("user_name@example.com")).toBe(true);
    });

    test("should pass with international TLDs", () => {
      expect(ruleHandler("user@example.co.uk")).toBe(true);
      expect(ruleHandler("user@example.com.br")).toBe(true);
    });

    test("should pass quoted local part", () => {
      expect(ruleHandler('"user name"@example.com')).toBe(true);
      expect(ruleHandler('"user@name"@example.com')).toBe(true);
    });

    test("should pass with UTF-8 characters", () => {
      expect(ruleHandler("użytkownik@example.com")).toBe(true);
    });
  });

  describe("invalid emails", () => {
    test("should fail without domain", () => {
      expect(ruleHandler("user@")).toBe(false);
    });

    test("should fail without TLD", () => {
      expect(ruleHandler("user@example")).toBe(false);
      expect(ruleHandler("user@localhost")).toBe(false);
    });

    test("should fail without @", () => {
      expect(ruleHandler("userexample.com")).toBe(false);
    });

    test("should fail with multiple @", () => {
      expect(ruleHandler("user@@example.com")).toBe(false);
    });

    test("should fail with spaces", () => {
      expect(ruleHandler("user @example.com")).toBe(false);
      expect(ruleHandler("user@ example.com")).toBe(false);
      expect(ruleHandler(" user@example.com")).toBe(false);
    });

    test("should fail with consecutive dots", () => {
      expect(ruleHandler("user..name@example.com")).toBe(false);
    });

    test("should fail with dot at start/end of local part", () => {
      expect(ruleHandler(".user@example.com")).toBe(false);
      expect(ruleHandler("user.@example.com")).toBe(false);
    });

    test("should fail with empty local part", () => {
      expect(ruleHandler("@example.com")).toBe(false);
    });

    test("should fail with too long email (>254)", () => {
      const longLocal = "a".repeat(250);
      expect(ruleHandler(`${longLocal}@example.com`)).toBe(false);
    });

    test("should fail with too long local part (>64)", () => {
      const longLocal = "a".repeat(65);
      expect(ruleHandler(`${longLocal}@example.com`)).toBe(false);
    });

    test("should fail with non-string input", () => {
      expect(ruleHandler(["array"])).toBe(false);
      expect(ruleHandler(null as any)).toBe(false);
      expect(ruleHandler(undefined as any)).toBe(false);
      expect(ruleHandler(123 as any)).toBe(false);
    });
  });

  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty("email");
  });
});
