import { array, arrayUnique, arrayUniqueObjects } from "../rules/array.rule";

test("rules:array", () => {
  const ruleHandler = array().handler;
  expect(ruleHandler([])).toBe(true);
  expect(ruleHandler({})).toBe(false);
  expect(ruleHandler(1)).toBe(false);
  expect(ruleHandler("Test")).toBe(false);
  expect(ruleHandler(true)).toBe(false);
});

test("rules:arrayUnique", () => {
  const ruleHandler = arrayUnique().handler;
  expect(ruleHandler([])).toBe(true);
  expect(ruleHandler({})).toBe(false);
  expect(ruleHandler(1)).toBe(false);
  expect(ruleHandler("Test")).toBe(false);
  expect(ruleHandler(true)).toBe(false);

  expect(ruleHandler([1, 2, 3])).toBe(true);
  expect(ruleHandler(["a", "b", "c"])).toBe(true);

  expect(ruleHandler([1, 2, 3, 1])).toBe(false);
  expect(ruleHandler(["a", "b", "c", "a", "d"])).toBe(false);
});

test("rules:arrayUniqueObjects", function (): void {
  const ruleHandler = arrayUniqueObjects(['id']).handler;
  expect(ruleHandler([])).toBe(true);
  expect(ruleHandler({})).toBe(false);
  expect(ruleHandler(1)).toBe(false);
  expect(ruleHandler("Test")).toBe(false);
  expect(ruleHandler(true)).toBe(false);

  expect(ruleHandler([1, 2, 3])).toBe(false);
  expect(ruleHandler([{ id: 1 }, { id: 2 }])).toBe(true);

  expect(ruleHandler([{ id: 1 }, { id: 1 }])).toBe(false);
});
