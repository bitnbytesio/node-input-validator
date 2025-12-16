import { Messages } from "../messages/index.js";
import { contains, notContains } from "./contains.rule.js";

describe("rules:contains", () => {
  test("should pass", () => {
    const ruleHandler = contains(["package"]).handler;
    expect(ruleHandler("This package is awesome.")).toBe(true);
    expect(contains(["package", 'i']).handler("This Package is awesome.")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = contains(["package"]).handler;
    expect(ruleHandler("Node is awesome.")).toBe(false);
    expect(ruleHandler("Node is Package.")).toBe(false);
    expect(ruleHandler(["array"])).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => contains([])).toThrow(new Error('Invalid number of arguments.'));
    expect(() => contains(['test', 'g'])).toThrow(new Error('Only support modifier is insensitive (i).'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('contains');
  });
});

describe("rules:notContains", () => {
  test("should pass", () => {
    const ruleHandler = notContains(["Node"]).handler;
    expect(ruleHandler("This package is awesome.")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = notContains(["Node"]).handler;
    expect(ruleHandler("Node is awesome.")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => notContains([])).toThrow(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('notContains');
  });
});
