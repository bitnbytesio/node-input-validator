import { Messages } from "../messages/index.js";
import { hash } from "./hash.rule.js";


describe("rules:hash", () => {
  test("should pass", () => {
    const ruleHandler = hash(["md5"]).handler;
    expect(ruleHandler("46f8fb7d635cb71beafe8fe580c56164")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = hash(["md5"]).handler;
    expect(ruleHandler("Yes, Node is awesome")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => hash([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => hash(['abc'])).toThrow(new Error('Algo abc not supported.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('hash');
  });
});
