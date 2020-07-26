import { contains, notContains } from "./contains.rule";

describe("rules:contains", () => {
  test("should pass", () => {
    const ruleHandler = contains(["package"]).handler;
    expect(ruleHandler("This package is awesome.")).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = contains(["package"]).handler;
    expect(ruleHandler("Node is awesome.")).toBe(false);
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
});
