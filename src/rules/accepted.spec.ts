import { accepted } from "../rules/accepted.rule";

test("rules:accepted", () => {
  const ruleHandler = accepted().handler;
  expect(ruleHandler("yes")).toBe(true);
  expect(ruleHandler("no")).toBe(false);
});
