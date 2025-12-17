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

  test("should timeout and return false when DNS lookup exceeds timeout", async () => {
    // Mock dns.lookup to simulate slow DNS
    const dns = require('dns');
    const originalLookup = dns.lookup;

    dns.lookup = (_hostname: string, callback: Function) => {
      // Simulate slow DNS that takes 500ms
      setTimeout(() => callback(null), 500);
    };

    try {
      // Use 50ms timeout - DNS mock takes 500ms, so it should timeout
      const ruleHandler = activeUrl(['http:', 'https:'], 50).handler;
      expect(await ruleHandler("https://example.com")).toBe(false);
    } finally {
      dns.lookup = originalLookup;
    }
  });

  test("should succeed with sufficient timeout", async () => {
    // Use default timeout (10 seconds) - should succeed for valid domain
    const ruleHandler = activeUrl(['http:', 'https:'], 10000).handler;
    expect(await ruleHandler("https://google.com")).toBe(true);
  });

  test("should return false for URL without protocol", async () => {
    const ruleHandler = activeUrl().handler;
    expect(await ruleHandler("example.com")).toBe(false);
    expect(await ruleHandler("www.google.com")).toBe(false);
  });

  test("message should exist", () => {
    expect(Messages.en_US.messages).toHaveProperty('activeUrl');
  });
});
