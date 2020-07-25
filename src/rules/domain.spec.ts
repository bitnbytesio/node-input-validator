import { domain } from "./domain.rule";

test("rules:domain", function (): void {
  const ruleHandler = domain().handler;
  expect(ruleHandler("example.com")).toBe(true);
  expect(ruleHandler("www.example.com")).toBe(true);
  expect(ruleHandler("http://www.example.com")).toBe(false);
  expect(ruleHandler("localhost")).toBe(false);
});
