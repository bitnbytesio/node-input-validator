import fs from 'fs';
import { Messages } from '../messages/index.js';

import { size } from './size.rule.js';

const filePath = './stubs/file-small.png';

const file = fs.readFileSync(filePath)

describe('rule:size', () => {
  test('should pass', async () => {
    expect(await size(['4kb'], true).handler({ size: 1024 * 4 })).toBe(true);
    expect(await size(['4kb']).handler(file)).toBe(true);
    expect(await size(['4kb']).handler(filePath)).toBe(true);
    expect(await size(['4kb']).handler({ path: filePath })).toBe(true);
    expect(await size(['4kb', '2kb']).handler(file)).toBe(true);
  });

  test('should fail', async () => {
    expect(await size(['2kb']).handler(file)).toBe(false);
    expect(await size(['4kb', '3kb']).handler(file)).toBe(false);
    expect(await size(['4kb', '3kb']).handler({})).toBe(false);
  });

  test("should throw exception", function (): void {
    expect(() => size([])).toThrowError(new Error('Invalid number of arguments.'));
  });

  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('size');
  });
});
