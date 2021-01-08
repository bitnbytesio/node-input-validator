import { Messages } from "../messages";
import { different } from "./different.rule";
import { ValidatorMock } from '../mock/validator.mock'

test("rules:different", function (): void {
  const ruleHandler = different(["new_password"]).handler;
  expect(ruleHandler("000000", new ValidatorMock({ new_password: "123456" }))).toBe(true);
  expect(ruleHandler("000000", new ValidatorMock({ new_password: "000000" }))).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('different');
});
