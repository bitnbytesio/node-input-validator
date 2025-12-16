import { Messages } from "../messages/index.js";
import {
  minLength,
  maxLength,
  length,
  lengthBetween,
} from "./length.rule.js";

describe('rules:minLength', () => {
  test("should pass", () => {
    const ruleHandler = minLength(["5"]).handler;
    expect(ruleHandler("uname")).toBe(true);
    expect(ruleHandler("unam")).toBe(false);
  });
  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('minLength');
  });
  test("rules:minLength throw exception", function (): void {
    expect(() => minLength([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe('rules:maxLength', () => {
  test("should pass", () => {
    const ruleHandler = maxLength(["5"]).handler;
    expect(ruleHandler("uname")).toBe(true);
    expect(ruleHandler("unames")).toBe(false);
  });

  test("rules:maxLength throw exception", () => {
    expect(() => maxLength([])).toThrow(new Error('Invalid number of arguments.'));
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('maxLength');
  });
});


describe('rules:length', () => {
  test("should pass", () => {
    const ruleHandler = length(["5"]).handler;
    expect(ruleHandler("uname")).toBe(true);
    expect(ruleHandler([1, 2, 3, 4, 5])).toBe(true);
  });

  test("should pass", () => {
    const ruleHandler = length(["5", '2']).handler;
    expect(ruleHandler("un")).toBe(true);
    expect(ruleHandler([1, 2])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = length(["5", '2']).handler;
    expect(ruleHandler("u")).toBe(false);
    expect(ruleHandler("username")).toBe(false);
    expect(ruleHandler([1])).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => length([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => length(['1', '2', '3'])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe('rules:lengthBetween', () => {
  test("should pass", () => {
    const ruleHandler = lengthBetween(["1", "3"]).handler;
    expect(ruleHandler("una")).toBe(true);
    expect(ruleHandler([1, 2, 3])).toBe(true);
  });

  test("should pass", () => {
    const ruleHandler = lengthBetween(["3", '5']).handler;
    expect(ruleHandler("un")).toBe(false);
    expect(ruleHandler([1, 2])).toBe(false);
  });

  test("should fail", () => {
    const ruleHandler = lengthBetween(["2", '5']).handler;
    expect(ruleHandler("u")).toBe(false);
    expect(ruleHandler([1])).toBe(false);
    expect(ruleHandler({})).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => lengthBetween([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => lengthBetween(['1', '2', '3'])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => lengthBetween(['5', '2'])).toThrow(new RangeError('Seed min must be less then max.'));
  });
})
