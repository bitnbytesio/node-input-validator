import { Messages } from "../messages/index.js";
import { ascii, base64, json } from "./encoding.rule.js";

describe('rules:ascii', () => {
  test("should pass", function (): void {
    const ruleHandler = ascii().handler;
    expect(ruleHandler("abc123")).toBe(true);
    expect(ruleHandler("�")).toBe(false);
    expect(ruleHandler(null)).toBe(false);
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('ascii');
  });
});


describe('rules:json', () => {
  test("should pass", function (): void {
    const ruleHandler = json().handler;
    expect(ruleHandler("[1, 2, 3]")).toBe(true);
    expect(ruleHandler("string")).toBe(false);
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('json');
  });
});


describe('rules:base64', () => {
  test("should pass", function (): void {
    const ruleHandler = base64().handler;
    expect(ruleHandler("TklW")).toBe(true);
    expect(base64(['urlsafe']).handler("TklW")).toBe(true);
    expect(ruleHandler("123")).toBe(false);
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('base64');
  });
});
