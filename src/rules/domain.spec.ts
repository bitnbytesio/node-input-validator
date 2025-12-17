import { Messages } from "../messages/index.js";
import { domain } from "./domain.rule.js";

describe("rules:domain", function (): void {
  const ruleHandler = domain().handler;

  describe("valid domains", () => {
    test("should pass simple domain", () => {
      expect(ruleHandler("example.com")).toBe(true);
    });

    test("should pass with subdomain", () => {
      expect(ruleHandler("www.example.com")).toBe(true);
      expect(ruleHandler("sub.domain.example.com")).toBe(true);
    });

    test("should pass with hyphen in domain", () => {
      expect(ruleHandler("my-domain.com")).toBe(true);
      expect(ruleHandler("my-cool-domain.co.uk")).toBe(true);
    });

    test("should pass international TLDs", () => {
      expect(ruleHandler("example.co.uk")).toBe(true);
      expect(ruleHandler("example.com.br")).toBe(true);
    });

    test("should pass punycode domains (xn--)", () => {
      expect(ruleHandler("xn--nxasmq5b.com")).toBe(true);
    });

    test("should pass unicode domains", () => {
      expect(ruleHandler("example.xn--p1ai")).toBe(true); // .рф in punycode
    });
  });

  describe("invalid domains", () => {
    test("should fail with URL", () => {
      expect(ruleHandler("http://www.example.com")).toBe(false);
      expect(ruleHandler("https://example.com")).toBe(false);
    });

    test("should fail without TLD", () => {
      expect(ruleHandler("localhost")).toBe(false);
      expect(ruleHandler("intranet")).toBe(false);
    });

    test("should fail with numeric TLD", () => {
      expect(ruleHandler("example.123")).toBe(false);
    });

    test("should fail with hyphen at start/end", () => {
      expect(ruleHandler("-example.com")).toBe(false);
      expect(ruleHandler("example-.com")).toBe(false);
    });

    test("should fail with underscore", () => {
      expect(ruleHandler("my_domain.com")).toBe(false);
    });

    test("should fail with spaces", () => {
      expect(ruleHandler("my domain.com")).toBe(false);
      expect(ruleHandler("example .com")).toBe(false);
    });

    test("should fail with part longer than 63 chars", () => {
      const longLabel = "a".repeat(64);
      expect(ruleHandler(`${longLabel}.com`)).toBe(false);
    });

    test("should fail with non-string input", () => {
      expect(ruleHandler(["localhost"])).toBe(false);
      expect(ruleHandler(null as any)).toBe(false);
      expect(ruleHandler(undefined as any)).toBe(false);
    });

    test("should fail with full-width characters", () => {
      expect(ruleHandler("ｅｘａｍｐｌｅ.com")).toBe(false);
    });
  });

  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty("domain");
  });
});
