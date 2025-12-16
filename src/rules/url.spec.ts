import { Messages } from "../messages/index.js";
import { url, activeUrl } from "./url.rule.js";

test("rules:url", function (): void {
  const ruleHandler = url().handler;
  expect(ruleHandler("http://www.github.com")).toBe(true);
  expect(ruleHandler("artisangang")).toBe(false);
  expect(ruleHandler(null)).toBe(false);
  expect(Messages.en_US.messages).toHaveProperty('url');
});

describe("rules:activeUrl", () => {
  test("should return true for resolvable URLs", async () => {
    const ruleHandler = activeUrl().handler;
    // google.com should be resolvable
    expect(await ruleHandler("https://google.com")).toBe(true);
    expect(await ruleHandler("http://localhost")).toBe(true);
  });

  test("should return false for non-resolvable URLs", async () => {
    const ruleHandler = activeUrl().handler;
    // Invalid domain that doesn't exist
    expect(await ruleHandler("https://this-domain-does-not-exist-12345.invalid")).toBe(false);
  });

  test("should return false for invalid URLs", async () => {
    const ruleHandler = activeUrl().handler;
    expect(await ruleHandler("not-a-url")).toBe(false);
    expect(await ruleHandler(null)).toBe(false);
    expect(await ruleHandler(undefined)).toBe(false);
  });

  test("should respect protocol restrictions", async () => {
    const ruleHandler = activeUrl(['https:']).handler;
    expect(await ruleHandler("http://google.com")).toBe(false);
    expect(await ruleHandler("https://google.com")).toBe(true);
  });

  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty('activeUrl');
  });
});
