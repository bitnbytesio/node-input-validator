import { Messages } from '../messages';
import { ValidatorMock } from '../mock/validator.mock'

import { lt, lte } from "./lt.rule";

describe("rules:lt", () => {
  test("should pass", () => {
    const ruleHandler = lt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 10 }))).toBe(true);
    expect(ruleHandler(8, new ValidatorMock({ max: "10" }))).toBe(true);
    expect(ruleHandler("8", new ValidatorMock({ max: 10 }))).toBe(true);
    expect(ruleHandler("8", new ValidatorMock({ max: "10" }))).toBe(true);
    expect(ruleHandler("8.5", new ValidatorMock({ max: "8.6" }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = lt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 4 }))).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('lt');
  });
});

describe("rules:lte", () => {
  test("should pass", () => {
    const ruleHandler = lte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 10 }))).toBe(true);
    expect(ruleHandler(10, new ValidatorMock({ max: "10" }))).toBe(true);
    expect(ruleHandler("8", new ValidatorMock({ max: 10 }))).toBe(true);
    expect(ruleHandler("10", new ValidatorMock({ max: "10" }))).toBe(true);
    expect(ruleHandler("8.5", new ValidatorMock({ max: "8.5" }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = lte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 4 }))).toBe(false);
    expect(ruleHandler("8", new ValidatorMock({ max: "7" }))).toBe(false);
    expect(ruleHandler("8.5", new ValidatorMock({ max: "8.4" }))).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('lte');
  });
});
