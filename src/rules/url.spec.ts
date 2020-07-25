import { ValidatorLite } from '../mock/validator-lite.mock'

import { url } from "./url.rule";

test("rules:url", function (): void {
  const ruleHandler = url().handler;
  expect(ruleHandler("http://www.github.com")).toBe(true);
  expect(ruleHandler("artisangang")).toBe(false);
});
