import { ValidatorLite } from '../mock/validator-lite.mock'

import { lt } from "./lt.rule";

describe("rules:lt", () => {
  test("should pass", () => {
    const ruleHandler = lt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 10 }))).toBe(true);
    expect(ruleHandler(8, new ValidatorLite({ max: "10" }))).toBe(true);
    expect(ruleHandler("8", new ValidatorLite({ max: 10 }))).toBe(true);
    expect(ruleHandler("8", new ValidatorLite({ max: "10" }))).toBe(true);
    expect(ruleHandler("8.5", new ValidatorLite({ max: "8.6" }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = lt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 4 }))).toBe(false);
  });
});
