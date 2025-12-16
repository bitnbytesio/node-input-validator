import { Messages } from '../messages/index.js';
import { ValidatorMock } from '../mock/validator.mock.js';

import {
  required,
  requiredIf,
  requiredNotIf,
  requiredWithout,
  requiredWithoutAll,
  requiredWith,
  requiredWithAll,
} from "../rules/required.rule.js";

describe("rules:requiredIf", () => {
  test("should pass", function (): void {
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
    expect(Messages.en_US.messages).toHaveProperty('required');
  });
});

describe("rules:requiredIf", () => {
  test('should pass', function (): void {
    const inputs = {
      name: 'Some User',
      sex: 'male',
      age: 18,
    };

    expect(requiredIf(['age', '15']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredIf(['age', '15']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredIf(['age', '15']).handler(null, new ValidatorMock(inputs))).toBe(true);

    expect(requiredIf(['age', '18']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredIf(['age', '18']).handler('', new ValidatorMock(inputs))).toBe(false);
    expect(requiredIf(['age', '18']).handler(null, new ValidatorMock(inputs))).toBe(false);

    expect(requiredIf(['age', '15', 'sex', 'female']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredIf(['age', '18', 'sex', 'female']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredIf(['age', '15', 'sex', 'male']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    expect(requiredIf(['age', '18', 'sex', 'male']).handler(undefined, new ValidatorMock(inputs))).toBe(false);

    expect(Messages.en_US.messages).toHaveProperty('requiredIf');
  });

  test("should throw exception", function (): void {
    expect(() => requiredIf([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe("rules:requiredNotIf", () => {
  test('should pass - field optional when condition matches', function (): void {
    const inputs = {
      name: 'Some User',
      sex: 'male',
      age: 18,
    };

    // age is 18, so field is NOT required (may be blank)
    expect(requiredNotIf(['age', '18']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredNotIf(['age', '18']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredNotIf(['age', '18']).handler(null, new ValidatorMock(inputs))).toBe(true);
    expect(requiredNotIf(['age', '18']).handler('value', new ValidatorMock(inputs))).toBe(true);

    // age is NOT 15, so field IS required
    expect(requiredNotIf(['age', '15']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredNotIf(['age', '15']).handler('', new ValidatorMock(inputs))).toBe(false);
    expect(requiredNotIf(['age', '15']).handler(null, new ValidatorMock(inputs))).toBe(false);
    expect(requiredNotIf(['age', '15']).handler('value', new ValidatorMock(inputs))).toBe(true);

    // Multiple conditions: field optional only if ANY condition matches
    // sex is male (matches), so field is optional
    expect(requiredNotIf(['age', '15', 'sex', 'male']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    // age is 18 (matches), so field is optional
    expect(requiredNotIf(['age', '18', 'sex', 'female']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    // neither matches, field is required
    expect(requiredNotIf(['age', '15', 'sex', 'female']).handler(undefined, new ValidatorMock(inputs))).toBe(false);

    expect(Messages.en_US.messages).toHaveProperty('requiredNotIf');
  });

  test("should throw exception", function (): void {
    expect(() => requiredNotIf([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe("rules:requiredWithout", () => {
  test('should pass', function (): void {
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
    };

    // sex is present so attribute is optional
    expect(requiredWithout(['sex']).handler('ok', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithout(['sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithout(['sex']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithout(['sex']).handler(null, new ValidatorMock(inputs))).toBe(true);


    // age is missing so attribute is required
    expect(requiredWithout(['age']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithout(['age']).handler('', new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithout(['age']).handler(null, new ValidatorMock(inputs))).toBe(false);

    // age is missing and sex is present so attribute is required
    expect(requiredWithout(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithout(['age', 'sex']).handler('', new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithout(['age', 'sex']).handler(null, new ValidatorMock(inputs))).toBe(false);

    inputs.age = 18;

    // age and sex is present so attribute is optional
    expect(requiredWithout(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithout(['age', 'sex']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithout(['age', 'sex']).handler(null, new ValidatorMock(inputs))).toBe(true);

    expect(Messages.en_US.messages).toHaveProperty('requiredWithout');
  });

  test("should throw exception", function (): void {
    expect(() => requiredWithout([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe("rules:requiredWithoutAll", () => {
  test('should pass', function (): void {
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
    };

    // sex is present so attribute is optional
    expect(requiredWithoutAll(['sex']).handler('ok', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['sex']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['sex']).handler(null, new ValidatorMock(inputs))).toBe(true);


    // age is missing so attribute is required
    expect(requiredWithoutAll(['age']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithoutAll(['age']).handler('', new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithoutAll(['age']).handler(null, new ValidatorMock(inputs))).toBe(false);

    // age is missing and sex is present so attribute is optional
    expect(requiredWithoutAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['age', 'sex']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['age', 'sex']).handler(null, new ValidatorMock(inputs))).toBe(true);

    inputs.age = 18;

    // age and sex is present so attribute is optional
    expect(requiredWithoutAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['age', 'sex']).handler('', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithoutAll(['age', 'sex']).handler(null, new ValidatorMock(inputs))).toBe(true);

    expect(Messages.en_US.messages).toHaveProperty('requiredWithoutAll');
  });

  test('should work regardless of field order', function (): void {
    // Test that order of fields doesn't affect the result
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
      // age is missing
    };

    // ['sex', 'age'] - sex is present, age is missing -> NOT all are empty -> optional
    expect(requiredWithoutAll(['sex', 'age']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    // ['age', 'sex'] - same fields, different order -> should give same result
    expect(requiredWithoutAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    // Test with all fields missing
    const emptyInputs: any = {
      name: 'Some User',
      // both age and sex are missing
    };

    // All specified fields are empty -> required -> empty value should fail
    expect(requiredWithoutAll(['age', 'sex']).handler(undefined, new ValidatorMock(emptyInputs))).toBe(false);
    expect(requiredWithoutAll(['sex', 'age']).handler(undefined, new ValidatorMock(emptyInputs))).toBe(false);

    // All specified fields are empty -> required -> provided value should pass
    expect(requiredWithoutAll(['age', 'sex']).handler('value', new ValidatorMock(emptyInputs))).toBe(true);
  });

  test("should throw exception", function (): void {
    expect(() => requiredWithoutAll([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe("rules:requiredWith", () => {
  test('should pass', function (): void {
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
    };

    // sex is present so attribute is required
    expect(requiredWith(['sex']).handler('ok', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWith(['sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWith(['sex']).handler('', new ValidatorMock(inputs))).toBe(false);

    // age is missing so attribute is optional
    expect(requiredWith(['age']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    expect(requiredWith(['age']).handler('', new ValidatorMock(inputs))).toBe(true);

    // age is missing so attribute is optional (any missing = optional)
    expect(requiredWith(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    inputs.age = 18;

    // both age and sex present so attribute is required
    expect(requiredWith(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWith(['age', 'sex']).handler('value', new ValidatorMock(inputs))).toBe(true);

    expect(Messages.en_US.messages).toHaveProperty('requiredWith');
  });

  test("should throw exception", function (): void {
    expect(() => requiredWith([])).toThrow(new Error('Invalid number of arguments.'));
  });
});

describe("rules:requiredWithAll", () => {
  test('should pass', function (): void {
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
    };

    // sex is present so attribute is required
    expect(requiredWithAll(['sex']).handler('ok', new ValidatorMock(inputs))).toBe(true);
    expect(requiredWithAll(['sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);

    // age is missing so attribute is optional
    expect(requiredWithAll(['age']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    // age is missing (not ALL have values) so attribute is optional
    expect(requiredWithAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    inputs.age = 18;

    // both age and sex present (ALL have values) so attribute is required
    expect(requiredWithAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithAll(['age', 'sex']).handler('value', new ValidatorMock(inputs))).toBe(true);

    expect(Messages.en_US.messages).toHaveProperty('requiredWithAll');
  });

  test('should work regardless of field order', function (): void {
    // Test that order of fields doesn't affect the result
    const inputs: any = {
      name: 'Some User',
      sex: 'male',
      // age is missing
    };

    // ['sex', 'age'] - sex present, age missing -> NOT all present -> optional
    expect(requiredWithAll(['sex', 'age']).handler(undefined, new ValidatorMock(inputs))).toBe(true);
    // ['age', 'sex'] - same fields, different order -> should give same result
    expect(requiredWithAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(true);

    // Test with all fields present
    inputs.age = 18;

    // All specified fields have values -> required -> empty value should fail
    expect(requiredWithAll(['age', 'sex']).handler(undefined, new ValidatorMock(inputs))).toBe(false);
    expect(requiredWithAll(['sex', 'age']).handler(undefined, new ValidatorMock(inputs))).toBe(false);

    // All specified fields have values -> required -> provided value should pass
    expect(requiredWithAll(['age', 'sex']).handler('value', new ValidatorMock(inputs))).toBe(true);
  });

  test("should throw exception", function (): void {
    expect(() => requiredWithAll([])).toThrow(new Error('Invalid number of arguments.'));
  });
});
