import { before } from "../rules/before.rule";
import { Messages } from '../messages';

describe("rules:before", () => {
  test("should pass", () => {
    const d = new Date();

    d.setTime(d.getTime() - (1 * 60 * 60 * 1000));

    expect(before().handler(d.toISOString())).toBe(true);
    expect(before([new Date().toISOString()]).handler(d.toISOString())).toBe(true);
  });

  test("should fail", () => {
    const d = new Date();

    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));

    expect(before().handler(d.toISOString())).toBe(false);
    expect(before([new Date().toISOString()]).handler(d.toISOString())).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('before');
  });
});
