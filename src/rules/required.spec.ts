import { Messages } from '../messages/index.js';
import { ValidatorMock } from '../mock/validator.mock.js';

import {
  required,
  requiredIf,
  requiredWithout,
  requiredWithoutAll,
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
    expect(() => requiredIf([])).toThrowError(new Error('Invalid number of arguments.'));
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
    expect(() => requiredWithout([])).toThrowError(new Error('Invalid number of arguments.'));
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

  test("should throw exception", function (): void {
    expect(() => requiredWithoutAll([])).toThrowError(new Error('Invalid number of arguments.'));
  });
});
