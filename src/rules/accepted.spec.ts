import { accepted } from "../rules/accepted.rule";

describe("rules:accepted", () => {
  test("should pass", () => {
    expect(accepted().handler("true")).toBe(true);
    expect(accepted().handler("1")).toBe(true);
    expect(accepted().handler("yes")).toBe(true);
    expect(accepted().handler("on")).toBe(true);
    expect(accepted(["ok"]).handler("ok")).toBe(true);
  });

  test("should fail", () => {
    expect(accepted().handler("no")).toBe(false);
    expect(accepted(['ok']).handler("on")).toBe(false);
  });
});
