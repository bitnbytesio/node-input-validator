import { ValidatorLite } from '../mock/validator-lite.mock'

import { lte } from "./lte.rule";

describe("rules:lte", () => {
  test("should pass", () => {
    const ruleHandler = lte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 10 }))).toBe(true);
    expect(ruleHandler(10, new ValidatorLite({ max: "10" }))).toBe(true);
    expect(ruleHandler("8", new ValidatorLite({ max: 10 }))).toBe(true);
    expect(ruleHandler("10", new ValidatorLite({ max: "10" }))).toBe(true);
    expect(ruleHandler("8.5", new ValidatorLite({ max: "8.5" }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = lte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 4 }))).toBe(false);
    expect(ruleHandler("8", new ValidatorLite({ max: "7" }))).toBe(false);
    expect(ruleHandler("8.5", new ValidatorLite({ max: "8.4" }))).toBe(false);
  });
});
