import { minLength, maxLength } from "./length.rule";

test("rules:minLength", () => {
  const ruleHandler = minLength(["5"]).handler;
  expect(ruleHandler("uname")).toBe(true);
  expect(ruleHandler("unam")).toBe(false);
});



test("rules:maxLength", () => {
  const ruleHandler = maxLength(["5"]).handler;
  expect(ruleHandler("uname")).toBe(true);
  expect(ruleHandler("unames")).toBe(false);
});
