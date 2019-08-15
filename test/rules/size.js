const assert = require('assert');
const fs = require('fs');

const Validator = require('../../index');

describe('size', () => {
  it('should return true', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb' }
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should return true', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'size:4kb' }
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should return false', async () => {
    const v = new Validator(
      { file: { buffer: fs.readFileSync('./test/stubs/file-small.png') } }, { file: 'size:1kb' }
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should return false', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'size:1kb' }
    );


    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.file.message, v.parseExistingMessageOnly('size', 'file', '', '1kb'));
  });
});
