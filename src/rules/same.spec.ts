import { Messages } from '../messages';
import { ValidatorMock } from '../mock/validator.mock'

import { same } from "./same.rule";

describe("rules:same", () => {
  test("shoudl pass", function (): void {
    const ruleHandler = same(["confirmPassword"]).handler;
    expect(
      ruleHandler("123456", new ValidatorMock({ confirmPassword: "123456" }))).toBe(true);
    expect(
      ruleHandler("123456", new ValidatorMock({ confirmPassword: "123123" }))).toBe(false);

    expect(Messages.en_US.messages).toHaveProperty('same');
  });

  test("should throw exception", function (): void {
    expect(() => same([])).toThrowError(new Error('Invalid number of arguments.'));
  });
})
