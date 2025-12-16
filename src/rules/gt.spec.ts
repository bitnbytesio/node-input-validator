import { Messages } from '../messages/index.js';
import { ValidatorMock } from '../mock/validator.mock.js'
import { gt, gte } from "./gt.rule.js";

describe("rules:gt", () => {
  test("should pass", () => {
    const ruleHandler = gt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 5 }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = gt(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 9 }))).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => gt([])).toThrow(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('gt');
  });
});

describe("rules:gte", () => {
  test("should pass", () => {
    const ruleHandler = gte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 5 }))).toBe(true);
    expect(ruleHandler(8, new ValidatorMock({ max: 8 }))).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = gte(["max"]).handler;
    expect(ruleHandler(8, new ValidatorMock({ max: 9 }))).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => gte([])).toThrow(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('gte');
  });
});
