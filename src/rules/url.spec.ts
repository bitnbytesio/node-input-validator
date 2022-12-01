import { Messages } from "../messages/index.js";
import { url } from "./url.rule.js";

test("rules:url", function (): void {
  const ruleHandler = url().handler;
  expect(ruleHandler("http://www.github.com")).toBe(true);
  expect(ruleHandler("artisangang")).toBe(false);
  expect(ruleHandler(null)).toBe(false);
  expect(Messages.en_US.messages).toHaveProperty('url');
});
