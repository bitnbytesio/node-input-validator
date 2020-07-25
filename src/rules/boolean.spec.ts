import { booleanStrict, booleanStr, booleanInt, boolean } from "../rules/boolean.rule";

test("rules:booleanStrict", function (): void {
  const ruleHandler = booleanStrict().handler;
  expect(ruleHandler(true)).toBe(true);
  expect(ruleHandler(false)).toBe(true);
  expect(ruleHandler("false")).toBe(false);
});

test("rules:booleanStr", function (): void {
  const ruleHandler = booleanStr().handler;
  expect(ruleHandler(true)).toBe(false);
  expect(ruleHandler(false)).toBe(false);
  expect(ruleHandler("false")).toBe(true);
  expect(ruleHandler("true")).toBe(true);
});

test("rules:booleanInt", function (): void {
  const ruleHandler = booleanInt().handler;
  expect(ruleHandler(true)).toBe(false);
  expect(ruleHandler(false)).toBe(false);
  expect(ruleHandler("0")).toBe(false);
  expect(ruleHandler("1")).toBe(false);
  expect(ruleHandler(0)).toBe(true);
  expect(ruleHandler(1)).toBe(true);
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
