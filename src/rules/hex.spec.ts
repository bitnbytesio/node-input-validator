
import { Messages } from "../messages";
import { hex, hexColor } from "./hex.rule";

describe("rules:hex", () => {
  test("should pass", () => {
    const ruleHandler = hex().handler;
    expect(ruleHandler("6e6f646520696e7075742076616c696461746f72")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = hex().handler;
    expect(ruleHandler("Yes, Node is awesome")).toBe(false);
    expect(ruleHandler({})).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('hex');
  });
});

describe("rules:hexColor", () => {
  test("should pass", () => {
    const ruleHandler = hexColor().handler;
    expect(ruleHandler("#FFFFFF")).toBe(true);
    expect(ruleHandler("#000")).toBe(true);
    expect(ruleHandler("f00")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = hexColor().handler;
    expect(ruleHandler("Yes, Node is awesome")).toBe(false);
    expect(ruleHandler(false)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('hexColor');
  });
});
