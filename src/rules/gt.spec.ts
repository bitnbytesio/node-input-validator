import { ValidatorLite } from '../mock/validator-lite.mock'
import { gt, gte } from "./gt.rule";

describe("rules:gt", () => {
  test("should pass", () => {
    const ruleHandler = gt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 5 }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = gt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 9 }))).toBe(false);
  });
});

describe("rules:gte", () => {
  test("should pass", () => {
    const ruleHandler = gte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 5 }))).toBe(true);
    expect(ruleHandler(8, new ValidatorLite({ max: 8 }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = gte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorLite({ max: 9 }))).toBe(false);
  });
});
