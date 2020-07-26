import { equals } from "./equals.rule";

describe("rules:equals", function (): void {
  test("should pass", function (): void {
    const ruleHandler = equals(["yes"]).handler;
    expect(ruleHandler("yes")).toBe(true);
  });

  test("should fail", function (): void {
    const ruleHandler = equals(["yes"]).handler;
    expect(ruleHandler("Yes, Deno is awesome")).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => equals([])).toThrowError(new Error('Invalid number of arguments.'));
  });
});
