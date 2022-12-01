import { accepted, acceptedIf, acceptedNotIf } from "../rules/accepted.rule.js";
import { Messages } from '../messages/index.js';
import { ValidatorMock } from '../mock/validator.mock.js';

describe("rules:accepted", () => {
  test("should pass", () => {
    expect(accepted().handler("true")).toBe(true);
    expect(accepted().handler("1")).toBe(true);
    expect(accepted().handler("yes")).toBe(true);
    expect(accepted().handler("on")).toBe(true);
    expect(accepted(["ok"]).handler("ok")).toBe(true);
  });

  test("should fail", () => {
    expect(accepted().handler("no")).toBe(false);
    expect(accepted(['ok']).handler("on")).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('accepted');
  });
});

describe("rules:acceptedIf", () => {
  test("should pass", () => {
    // service not enabled and t&c not accepted
    expect(acceptedIf(['services', 'yes'])
      .handler("false", new ValidatorMock({ services: 'no' })))
      .toBe(true);

    // service enabled and t&c accepted
    expect(acceptedIf(['services', 'yes'])
      .handler("true", new ValidatorMock({ services: 'yes' })))
      .toBe(true);
  });

  test("should fail", () => {
    expect(acceptedIf(['services', 'yes'])
      .handler("false", new ValidatorMock({ services: 'yes' })))
      .toBe(false);
  });

  test("should throw", () => {
    expect(() => acceptedIf(['services'])
      .handler("true", new ValidatorMock({ services: 'true' })))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('acceptedIf');
  });
});


describe("rules:acceptedNotIf", () => {
  test("should pass", () => {
    expect(acceptedNotIf(['services', 'no'])
      .handler("false", new ValidatorMock({ services: 'no' })))
      .toBe(true);
  });

  test("should fail", () => {
    expect(acceptedNotIf(['services', 'no'])
      .handler("true", new ValidatorMock({ services: 'no' })))
      .toBe(false);
  });

  test("should throw", () => {
    expect(() => acceptedNotIf(['services'])
      .handler("true", new ValidatorMock({ services: 'true' })))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('acceptedNotIf');
  });
});
