import { Messages } from '../messages';
import { ValidatorMock } from '../mock/validator.mock'

import { regex } from "./regex.rule";

test("rules:regex", function (): void {
  const ruleHandler = regex(["regex"]).handler;
  expect(
    ruleHandler(
      "abc",
      new ValidatorMock({ regex: "[abc]" }),
    )).toBe(true),
    expect(
      ruleHandler(
        "xyz",
        new ValidatorMock({ regex: "[abc]" }),
      )).toBe(false);

  expect(Messages.en_US.messages).toHaveProperty('regex');
});
