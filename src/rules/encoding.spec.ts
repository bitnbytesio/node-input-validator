import { Messages } from "../messages";
import { json } from "./encoding.rule";

test("rules:json", function (): void {
  const ruleHandler = json().handler;
  expect(ruleHandler("[1, 2, 3]")).toBe(true);
  expect(ruleHandler("string")).toBe(false);
});


test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('json');
});
