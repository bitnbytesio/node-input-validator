import { _in, notIn } from "./in.rule";

describe("rules:in", () => {
  test("should pass", () => {
    const ruleHandler = _in(["public", "private"]).handler;
    expect(ruleHandler("public")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = _in(["public", "private"]).handler;
    expect(ruleHandler("active")).toBe(false);
  });
});


describe("rules:notIn", () => {
  test("should pass", () => {
    const ruleHandler = notIn(["public", "private"]).handler;
    expect(ruleHandler("active")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = notIn(["public", "private"]).handler;
    expect(ruleHandler("public")).toBe(false);
  });
});
