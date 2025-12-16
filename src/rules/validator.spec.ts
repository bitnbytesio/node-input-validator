import { validator } from './validator.rule.js'

describe('validator', () => {
  test('should pass', () => {
    expect(validator('isEmail').handler('bitnbytesio@gmail.com')).toBe(true);
  });

  test('should fail', () => {
    expect(validator('isEmail').handler('bitnbytesio')).toBe(false);
  });

  test('should throw error', () => {
    expect(() => validator('isMissingRule')).toThrow(new Error('Rule isMissingRule does not exists on validator.js.'));
  });
})
