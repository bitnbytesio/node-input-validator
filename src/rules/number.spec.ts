import { Messages } from "../messages/index.js";
import {
  integer,
  decimal,
  max,
  min,
  numeric,
} from "./number.rule.js";

describe("rules:integer", () => {
  test("should pass", () => {
    const ruleHandler = integer().handler;
    expect(ruleHandler("12")).toBe(true);
    expect(ruleHandler(12)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = integer().handler;
    expect(ruleHandler("12.5")).toBe(false);
    expect(ruleHandler("draft")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('integer');
  });
});

describe("rules:decimal", () => {
  test("should pass", () => {
    const ruleHandler = decimal().handler;
    expect(ruleHandler("12.50")).toBe(true);
    expect(ruleHandler("12.5")).toBe(true);
    expect(ruleHandler("12")).toBe(true);
    expect(ruleHandler("0.5345")).toBe(true);
    expect(ruleHandler("0")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = decimal().handler;
    expect(ruleHandler("abc")).toBe(false);
    expect(ruleHandler(12.5)).toBe(false);
    expect(ruleHandler([])).toBe(false);
    expect(ruleHandler({})).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('decimal');
  });
});

describe("rules:max", () => {
  test("should pass", () => {
    const ruleHandler = max(["10"]).handler;
    expect(ruleHandler("10")).toBe(true);
    expect(ruleHandler("9.99")).toBe(true);
    expect(ruleHandler(10)).toBe(true);
    expect(ruleHandler(9.99)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = max(["10"]).handler;
    expect(ruleHandler("10.1")).toBe(false);
    expect(ruleHandler(10.1)).toBe(false);
    expect(ruleHandler("30")).toBe(false);
    expect(ruleHandler("abc")).toBe(false)
    expect(ruleHandler([])).toBe(false)
    expect(ruleHandler({})).toBe(false)
  });

  test("should throw exception", function (): void {
    expect(() => max([])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => max(['a'])).toThrowError(TypeError('Seed must be number.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('max');
  });
});

describe("rules:min", () => {
  test("should pass", () => {
    const ruleHandler = min(["10"]).handler;
    expect(ruleHandler("10")).toBe(true);
    expect(ruleHandler(10)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = min(["10"]).handler;
    expect(ruleHandler("5")).toBe(false);
    expect(ruleHandler("abc")).toBe(false);
    expect(ruleHandler([])).toBe(false);
    expect(ruleHandler({})).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => min([])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => min(['a'])).toThrowError(TypeError('Seed must be number.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('min');
  });
});


describe("rules:numeric", function (): void {
  test("should pass", function (): void {
    const ruleHandler = numeric().handler;
    expect(ruleHandler("12")).toBe(true);
    expect(ruleHandler(12)).toBe(true);
    expect(ruleHandler("12.5")).toBe(true);
    expect(ruleHandler(12.5)).toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = numeric().handler;
    expect(ruleHandler("draft")).toBe(false);
    expect(ruleHandler([])).toBe(false);
    expect(ruleHandler({})).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('numeric');
  });
});
