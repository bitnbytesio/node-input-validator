import { ValidatorLite } from '../mock/validator-lite.mock';

import { required, requiredIf } from "../rules/required.rule";

test("rules:required", function (): void {
  const ruleHandler = required().handler;
  expect(ruleHandler("yes")).toBe(true);
  expect(ruleHandler("true")).toBe(true);
  expect(ruleHandler(true)).toBe(true);
  expect(ruleHandler(false)).toBe(true);
  expect(ruleHandler("0")).toBe(true);
  expect(ruleHandler(0)).toBe(true);
  expect(ruleHandler("")).toBe(false);
  expect(ruleHandler()).toBe(false);
  expect(ruleHandler(null)).toBe(false);
});

test("rules:requiredIf", function (): void {
  const inputs = {
    name: 'Some User',
    sex: 'male',
    age: 18,
  };

  expect(requiredIf(['age', '15']).handler(undefined, new ValidatorLite(inputs))).toBe(true);
  expect(requiredIf(['age', '15']).handler('', new ValidatorLite(inputs))).toBe(true);
  expect(requiredIf(['age', '15']).handler(null, new ValidatorLite(inputs))).toBe(true);

  expect(requiredIf(['age', '18']).handler(undefined, new ValidatorLite(inputs))).toBe(false);
  expect(requiredIf(['age', '18']).handler('', new ValidatorLite(inputs))).toBe(false);
  expect(requiredIf(['age', '18']).handler(null, new ValidatorLite(inputs))).toBe(false);

  expect(requiredIf(['age', '15', 'sex', 'female']).handler(undefined, new ValidatorLite(inputs))).toBe(true);
  expect(requiredIf(['age', '18', 'sex', 'female']).handler(undefined, new ValidatorLite(inputs))).toBe(true);
  expect(requiredIf(['age', '15', 'sex', 'male']).handler(undefined, new ValidatorLite(inputs))).toBe(true);

  expect(requiredIf(['age', '18', 'sex', 'male']).handler(undefined, new ValidatorLite(inputs))).toBe(false);
});
