import { dateAdapter } from './index.js';

describe('date:dateAdapter', () => {
  test('should throw exception', () => {
    expect(() => dateAdapter()).toThrowError(new Error('Please set date adapter to use date rules.'));
  })
})
