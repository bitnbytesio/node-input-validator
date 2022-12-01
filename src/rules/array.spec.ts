import { Messages } from "../messages/index.js";
import {
  array,
  arrayLen,
  arrayLenMax,
  arrayLenMin,
  arrayLenRange,
  arrayUnique,
  arrayUniqueObjects,
} from "../rules/array.rule.js";

describe("rules:array", () => {
  test("should pass", () => {
    const ruleHandler = array().handler;
    expect(ruleHandler([])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = array().handler;
    expect(ruleHandler({})).toBe(false);
    expect(ruleHandler(1)).toBe(false);
    expect(ruleHandler("Test")).toBe(false);
    expect(ruleHandler(true)).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('array');
  });
});

describe("rules:arrayUnique", () => {
  test("should pass", () => {
    const ruleHandler = arrayUnique().handler;
    expect(ruleHandler([])).toBe(true);
    expect(ruleHandler([1, 2, 3])).toBe(true);
    expect(ruleHandler(["a", "b", "c"])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayUnique().handler;
    expect(ruleHandler({})).toBe(false);
    expect(ruleHandler(1)).toBe(false);
    expect(ruleHandler("Test")).toBe(false);
    expect(ruleHandler(true)).toBe(false);
    expect(ruleHandler([1, 2, 3, 1])).toBe(false);
    expect(ruleHandler(["a", "b", "c", "a", "d"])).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayUnique');
  });
})

describe("rules:arrayUniqueObjects", () => {
  test("should pass", () => {
    const ruleHandler = arrayUniqueObjects(['id']).handler;
    expect(ruleHandler([])).toBe(true);
    expect(ruleHandler([{ id: 1 }, { id: 2 }])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayUniqueObjects(['id']).handler;
    expect(ruleHandler({})).toBe(false);
    expect(ruleHandler(1)).toBe(false);
    expect(ruleHandler("Test")).toBe(false);
    expect(ruleHandler(true)).toBe(false);
    expect(ruleHandler([1, 2, 3])).toBe(false);
    expect(ruleHandler([{ id: 1 }, { id: 1 }])).toBe(false);
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayUniqueObjects');
  });
});



describe("rules:arrayLen", () => {
  test("should pass", () => {
    const ruleHandler = arrayLen(['1']).handler;
    expect(ruleHandler([1])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayLen(['1']).handler;
    expect(ruleHandler([])).toBe(false);
  });

  test("should throw", () => {
    expect(() => arrayLen([])
      .handler([]))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayLen');
  });
});


describe("rules:arrayLenRange", () => {
  test("should pass", () => {
    const ruleHandler = arrayLenRange(['2']).handler;
    expect(ruleHandler([1])).toBe(true);
  });

  test("should pass", () => {
    const ruleHandler = arrayLenRange(['2', '1']).handler;
    expect(ruleHandler([2, 1])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayLenRange(['1']).handler;
    expect(ruleHandler([1, 2])).toBe(false);
  });

  test("should fail", () => {
    const ruleHandler = arrayLenRange(['2', '1']).handler;
    expect(ruleHandler([])).toBe(false);
  });

  test("should throw", () => {
    expect(() => arrayLenRange([])
      .handler([]))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayLenRange');
    expect(Messages.en_US.messages.arrayLenRange({ ruleArgs: ['5'] }))
      .not.toBe(Messages.en_US.messages.arrayLenRange({ ruleArgs: ['5', '1'] }))
  });
});


describe("rules:arrayLenMin", () => {
  test("should pass", () => {
    const ruleHandler = arrayLenMin(['1']).handler;
    expect(ruleHandler([1])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayLenMin(['1']).handler;
    expect(ruleHandler([])).toBe(false);
  });

  test("should throw", () => {
    expect(() => arrayLenMin([])
      .handler([]))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayLenMin');
  });
});

describe("rules:arrayLenMax", () => {
  test("should pass", () => {
    const ruleHandler = arrayLenMax(['1']).handler;
    expect(ruleHandler([1])).toBe(true);
  });

  test("should fail", () => {
    const ruleHandler = arrayLenMax(['1']).handler;
    expect(ruleHandler([1, 2])).toBe(false);
  });

  test("should throw", () => {
    expect(() => arrayLenMax([])
      .handler([]))
      .toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('arrayLenMax');
  });
});
