import { Messages } from "../messages";
import { digits, digitsBetween } from "./digits.rule";

describe('rules:digits', () => {
  test("should pass", function (): void {
    const ruleHandler = digits(["5"]).handler;
    expect(ruleHandler(12345)).toBe(true);
    expect(ruleHandler("12345")).toBe(true);
  });

  test("should fails", function (): void {
    const ruleHandler = digits(["5"]).handler;
    expect(ruleHandler(123)).toBe(false);
    expect(ruleHandler(123456)).toBe(false);

    expect(ruleHandler("123")).toBe(false);
    expect(ruleHandler("123456")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => digits([])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => digits(["1", "2"])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => digits(["abc"])).toThrowError(new TypeError('Seeds must be number.'));
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
    expect(() => digitsBetween([])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["1"])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["1", "2", "3"])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => digitsBetween(["abc", "xyz"])).toThrowError(new TypeError('Seeds must be number.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('digitsBetween');
  });
});
