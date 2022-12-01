import { Messages } from '../messages/index.js';
import { ValidatorMock } from '../mock/validator.mock.js'

import { regex } from "./regex.rule.js";

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
