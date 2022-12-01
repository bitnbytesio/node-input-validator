import { Messages } from "../messages/index.js";
import { between } from "./between.rule.js";

describe('rules:between', () => {

  test("should pass", function (): void {
    const ruleHandler = between(["5", "8"]).handler;
    expect(ruleHandler(6)).toBe(true);
    expect(ruleHandler([5, 6, 7, 8])).toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = between(["5", "8"]).handler;

    expect(ruleHandler(9)).toBe(false);
    expect(ruleHandler('a')).toBe(false);
    expect(ruleHandler([9])).toBe(false);
    expect(ruleHandler(['a'])).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => between([])).toThrowError(new Error('Invalid number of arguments.'));
    expect(() => between(["abc", "xyz"])).toThrowError(new TypeError('Seeds must be number.'));
    expect(() => between(["5", "4"])).toThrowError(new RangeError('Seed min must be less then max.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('between');
  });
});
