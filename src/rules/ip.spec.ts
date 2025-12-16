
import { Messages } from "../messages/index.js";
import { ip, ipv4, ipv6 } from "./ip.rule.js";

test("rules:ip", () => {
  const ruleHandler = ip().handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
  expect(ruleHandler(undefined)).toBe(false);
});

test("rules:ip with version 4", () => {
  const ruleHandler = ip(['4']).handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
  expect(ruleHandler("invalid")).toBe(false);
});

test("rules:ip with version 6", () => {
  const ruleHandler = ip(['6']).handler;
  expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
  expect(ruleHandler("::1")).toBe(true);
  expect(ruleHandler("192.168.1.14")).toBe(false);
  expect(ruleHandler("invalid")).toBe(false);
});

test("rules:ipv4 (deprecated)", () => {
  const ruleHandler = ipv4().handler;
  expect(ruleHandler("192.168.1.14")).toBe(true);
  expect(ruleHandler("10.0.0.1")).toBe(true);
  expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
  expect(ruleHandler("invalid")).toBe(false);
  expect(ruleHandler(undefined)).toBe(false);
});

test("rules:ipv6 (deprecated)", () => {
  const ruleHandler = ipv6().handler;
  expect(ruleHandler("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
  expect(ruleHandler("::1")).toBe(true);
  expect(ruleHandler("fe80::1")).toBe(true);
  expect(ruleHandler("192.168.1.14")).toBe(false);
  expect(ruleHandler("invalid")).toBe(false);
  expect(ruleHandler(undefined)).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('ip');
  expect(Messages.en_US.messages).toHaveProperty('ipv4');
  expect(Messages.en_US.messages).toHaveProperty('ipv6');
});
