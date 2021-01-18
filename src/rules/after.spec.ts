import { after } from "../rules/after.rule";
import { Messages } from '../messages';

describe("rules:accepted", () => {
  test("should pass", () => {
    const d = new Date();

    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));

    expect(after().handler(d.toISOString())).toBe(true);
    expect(after([new Date().toISOString()]).handler(d.toISOString())).toBe(true);
  });

  test("should fail", () => {
    const d = new Date();

    d.setTime(d.getTime() - (1 * 60 * 60 * 1000));

    expect(after().handler(d.toISOString())).toBe(false);
    expect(after([new Date().toISOString()]).handler(d.toISOString())).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('after');
  });
});
