import { Messages } from "../messages/index.js";
import { digits, digitsBetween } from "./digits.rule.js";

describe('rules:digits', () => {
  test("should pass", function (): void {
    const ruleHandler = digits(["5"]).handler;
    expect(ruleHandler(12345)).toBe(true);
    expect(ruleHandler("12345")).toBe(true);
    expect(ruleHandler("00123")).toBe(true);
  });

  test("should fails", function (): void {
    const ruleHandler = digits(["5"]).handler;
    expect(ruleHandler(123)).toBe(false);
    expect(ruleHandler(123456)).toBe(false);

    expect(ruleHandler("123")).toBe(false);
    expect(ruleHandler("123456")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => digits([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => digits(["1", "2"])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => digits(["abc"])).toThrow(new TypeError('Seed must be number, greater then 0.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('digits');
  });
});

describe('rules:digitsBetween', () => {

  test("should pass", function (): void {
    const ruleHandler = digitsBetween(["5", "8"]).handler;
    expect(ruleHandler(12345)).toBe(true);
    expect(ruleHandler("12345")).toBe(true);
    expect(ruleHandler(12345678)).toBe(true);
    expect(ruleHandler("12345678")).toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = digitsBetween(["5", "8"]).handler;

    expect(ruleHandler(123)).toBe(false);
    expect(ruleHandler("123")).toBe(false);
    expect(ruleHandler(123456789)).toBe(false);
    expect(ruleHandler("123456789")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => digitsBetween([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["1"])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["1", "2", "3"])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["abc", "xyz"])).toThrow(new TypeError('Seeds must be number, greater then 0.'));
    expect(() => digitsBetween(["2", "1"])).toThrow(new Error('Seed min must be less then max.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('digitsBetween');
  });
});
