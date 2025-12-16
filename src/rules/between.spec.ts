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
    expect(() => between([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => between(["abc", "xyz"])).toThrow(new TypeError('Seeds must be number.'));
    expect(() => between(["5", "4"])).toThrow(new RangeError('Seed min must be less then max.'));
    // Test that second argument is validated (was a bug where only first arg was checked twice)
    expect(() => between(["5", "abc"])).toThrow(new TypeError('Seeds must be number.'));
    expect(() => between(["abc", "8"])).toThrow(new TypeError('Seeds must be number.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('between');
  });
});
