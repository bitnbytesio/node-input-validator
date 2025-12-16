import { Messages } from "../messages/index.js";
import { different } from "./different.rule.js";
import { ValidatorMock } from '../mock/validator.mock.js'

test("rules:different", function (): void {
  const ruleHandler = different(["new_password"]).handler;
  expect(ruleHandler("000000", new ValidatorMock({ new_password: "123456" }))).toBe(true);
  expect(ruleHandler("000000", new ValidatorMock({ new_password: "000000" }))).toBe(false);
});

test("should throw exception", function (): void {
  expect(() => different([])).toThrow(new Error('Invalid number of arguments.'));
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('different');
});
