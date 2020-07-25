import { booleanStrict, booleanStr, booleanInt, boolean } from "../rules/boolean.rule";

describe("rules:booleanStrict", () => {
  test("should pass", () => {
    const ruleHandler = booleanStrict().handler;
    expect(ruleHandler(true)).toBe(true);
    expect(ruleHandler(false)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = booleanStrict().handler;
    expect(ruleHandler("false")).toBe(false);
  });
});

describe("rules:booleanStr", () => {
  test("should pass", () => {
    const ruleHandler = booleanStr().handler;
    expect(ruleHandler("false")).toBe(true);
    expect(ruleHandler("true")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = booleanStr().handler;
    expect(ruleHandler(true)).toBe(false);
    expect(ruleHandler(false)).toBe(false);
  });
});

describe("rules:booleanInt", () => {
  test("should pass", () => {
    const ruleHandler = booleanInt().handler;
    expect(ruleHandler(0)).toBe(true);
    expect(ruleHandler(1)).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = booleanInt().handler;
    expect(ruleHandler(true)).toBe(false);
    expect(ruleHandler(false)).toBe(false);
    expect(ruleHandler("0")).toBe(false);
    expect(ruleHandler("1")).toBe(false);
  });
});

// test("rules:boolean", function (): void {
//   const ruleHandler = boolean().handler;
//   expect(ruleHandler(true)).toBe(true);
//   expect(ruleHandler(true)).toBe(true);
//   expect(ruleHandler("0")).toBe(true);
//   expect(ruleHandler("1")).toBe(true);
//   expect(ruleHandler(0)).toBe(true);
//   expect(ruleHandler(1)).toBe(true);
// });
