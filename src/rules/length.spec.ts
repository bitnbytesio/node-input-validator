import { Messages } from "../messages";
import { minLength, maxLength } from "./length.rule";

test("rules:minLength", () => {
  const ruleHandler = minLength(["5"]).handler;
  expect(ruleHandler("uname")).toBe(true);
  expect(ruleHandler("unam")).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('minLength');
});

test("rules:maxLength", () => {
  const ruleHandler = maxLength(["5"]).handler;
  expect(ruleHandler("uname")).toBe(true);
  expect(ruleHandler("unames")).toBe(false);
});


test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('maxLength');
});
