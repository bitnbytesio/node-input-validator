import { Messages } from "../messages/index.js";
import { creditCard } from "./creditCard.rule.js";

describe("rules:creditCard", () => {
  const ruleHandler = creditCard().handler;

  describe("valid credit cards", () => {
    describe("Visa", () => {
      test("should pass Visa card (16 digits)", () => {
        expect(ruleHandler("4111111111111111")).toBe(true);
      });

      test("should pass Visa card with spaces", () => {
        expect(ruleHandler("4111 1111 1111 1111")).toBe(true);
      });

      test("should pass Visa card with dashes", () => {
        expect(ruleHandler("4111-1111-1111-1111")).toBe(true);
      });

      test("should pass Visa card (13 digits)", () => {
        expect(ruleHandler("4222222222222")).toBe(true);
      });
    });

    describe("Mastercard", () => {
      test("should pass Mastercard (51-55 range)", () => {
        expect(ruleHandler("5500000000000004")).toBe(true);
        expect(ruleHandler("5500 0000 0000 0004")).toBe(true);
      });

      test("should pass Mastercard (2221-2720 range)", () => {
        expect(ruleHandler("2223000048400011")).toBe(true);
      });
    });

    describe("American Express", () => {
      test("should pass Amex card", () => {
        expect(ruleHandler("340000000000009")).toBe(true);
        expect(ruleHandler("3400 0000 0000 009")).toBe(true);
        expect(ruleHandler("378282246310005")).toBe(true);
      });
    });

    describe("Discover", () => {
      test("should pass Discover card", () => {
        expect(ruleHandler("6011111111111117")).toBe(true);
        expect(ruleHandler("6011000990139424")).toBe(true);
      });
    });

    describe("JCB", () => {
      test("should pass JCB card", () => {
        expect(ruleHandler("3530111333300000")).toBe(true);
        expect(ruleHandler("3566002020360505")).toBe(true);
      });
    });

    describe("Diners Club", () => {
      test("should pass Diners Club card", () => {
        expect(ruleHandler("30569309025904")).toBe(true);
        expect(ruleHandler("38520000023237")).toBe(true);
      });
    });

    describe("UnionPay", () => {
      test("should pass UnionPay card", () => {
        expect(ruleHandler("6200000000000005")).toBe(true);
      });
    });
  });

  describe("invalid credit cards", () => {
    test("should fail with too few digits", () => {
      expect(ruleHandler("412365")).toBe(false);
      expect(ruleHandler("411111111111")).toBe(false);
    });

    test("should fail with too many digits", () => {
      expect(ruleHandler("41111111111111111111")).toBe(false);
    });

    test("should fail Luhn check", () => {
      expect(ruleHandler("4111111111111112")).toBe(false);
      expect(ruleHandler("4111111111111110")).toBe(false);
    });

    test("should fail with invalid prefix", () => {
      expect(ruleHandler("1234567890123456")).toBe(false);
      expect(ruleHandler("9999999999999999")).toBe(false);
    });

    test("should fail with letters", () => {
      expect(ruleHandler("4111111111111a11")).toBe(false);
      expect(ruleHandler("abcd1111111111111")).toBe(false);
    });

    test("should fail with non-string input", () => {
      expect(ruleHandler(["412365"])).toBe(false);
      expect(ruleHandler(null as any)).toBe(false);
      expect(ruleHandler(undefined as any)).toBe(false);
      expect(ruleHandler(4111111111111111 as any)).toBe(false);
    });

    test("should fail empty string", () => {
      expect(ruleHandler("")).toBe(false);
    });
  });

  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty("creditCard");
  });
});
