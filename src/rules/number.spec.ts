import {
  integer,
  decimal,
  max,
  min,
  numeric,
} from "./number.rule";

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
});

describe("rules:decimal", () => {
  test("should pass", () => {
    const ruleHandler = decimal().handler;
    expect(ruleHandler("12.50")).toBe(true);
    expect(ruleHandler(12.55)).toBe(true);
    expect(ruleHandler(12)).toBe(true);
    expect(ruleHandler(0)).toBe(true);
    expect(ruleHandler("0")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = decimal().handler;
    expect(ruleHandler("abc")).toBe(false);
    expect(ruleHandler([])).toBe(false);
    expect(ruleHandler({})).toBe(false);
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
});
