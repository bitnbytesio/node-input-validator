import { Messages } from "../messages";
import {
  alpha,
  alphaNumeric,
  alphaNumericDash,
  alphaDash,
} from "../rules/alpha.rule";

describe("rules:alpha", (): void => {
  test("should pass", (): void => {
    const ruleHandler = alpha().handler;
    expect(ruleHandler("yes")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = alpha().handler;
    expect(ruleHandler("abc123")).toBe(false);
    expect(ruleHandler("123")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('alpha');
  });
});

describe("rules:alphaDash", (): void => {
  test("should pass", (): void => {
    const ruleHandler = alphaDash().handler;
    expect(ruleHandler("yes")).toBe(true);
    expect(ruleHandler("yes_ok")).toBe(true);
    expect(ruleHandler("yes-or-ok")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = alphaDash().handler;
    expect(ruleHandler("abc_123")).toBe(false);
    expect(ruleHandler("yes-123")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('alphaDash');
  });
});

describe("rules:alphaNumeric", (): void => {
  test("should pass", (): void => {
    const ruleHandler = alphaNumeric().handler;
    expect(ruleHandler("yes")).toBe(true);
    expect(ruleHandler("yes123")).toBe(true);
    expect(ruleHandler("123")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = alphaNumeric().handler;
    expect(ruleHandler("abc123_")).toBe(false);
    expect(ruleHandler("123-")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('alphaNumeric');
  });
});

describe("rules:alphaNumericDash", (): void => {
  test("should pass", (): void => {
    const ruleHandler = alphaNumericDash().handler;
    expect(ruleHandler("yes")).toBe(true);
    expect(ruleHandler("yes123")).toBe(true);
    expect(ruleHandler("123")).toBe(true);
    expect(ruleHandler("yes_")).toBe(true);
    expect(ruleHandler("yes-")).toBe(true);
    expect(ruleHandler("yes123_")).toBe(true);
    expect(ruleHandler("yes-123")).toBe(true);
    expect(ruleHandler("y_es-123")).toBe(true);
  });

  test("should fail", (): void => {
    const ruleHandler = alphaNumericDash().handler;
    expect(ruleHandler("abc123_!")).toBe(false);
    expect(ruleHandler("a+123")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('alphaNumericDash');
  });
});
