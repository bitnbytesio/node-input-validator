import fs from 'fs';
import { Messages } from '../messages';

import { mime } from './mime.rule';

const filePath = './stubs/file-small.png';

const file = fs.readFileSync(filePath)

describe('rule:mime', () => {
  test('should pass', async () => {
    expect(await mime(['png', 'jpg'], true).handler({ mime: 'image/png' })).toBe(true);
    expect(await mime(['png', 'jpg'], true).handler({ type: 'image/png' })).toBe(true);
    expect(await mime(['png', 'jpg']).handler(filePath)).toBe(true);
    expect(await mime(['png', 'jpg']).handler({ path: filePath })).toBe(true);
    expect(await mime(['png', 'jpg']).handler(file)).toBe(true);
    expect(await mime(['png', 'jpg']).handler({ buffer: file })).toBe(true);
  });

  test('should fail', async () => {
    expect(await mime(['jpeg', 'jpg']).handler(filePath)).toBe(false);
  });


  test("message should exists", () => {
    expect(Messages.en_US.messages).toHaveProperty('mime');
  });
});
