
import { Messages } from "../messages/index.js";
import { object } from "./object.rule.js";

describe("rules:object", () => {
  test("should pass", () => {
    const ruleHandler = object().handler;
    expect(ruleHandler({})).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = object().handler;
    expect(ruleHandler([])).toBe(false);
    expect(ruleHandler(1)).toBe(false);
    expect(ruleHandler("Test")).toBe(false);
    expect(ruleHandler(true)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('object');
  });
});
