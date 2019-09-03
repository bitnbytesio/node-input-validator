const assert = require('assert');
const fs = require('fs');


const { Validator } = require('../../lib/index');

describe('size', () => {
  it('should pass with buffer', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with buffer using min and max seed', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb,2kb' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail min size', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:5kb,4kb' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail max size', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:,4kb' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with path', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'size:4kb' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fails', async () => {
    const v = new Validator(
      { file: { buffer: fs.readFileSync('./test/stubs/file-small.png') } }, { file: 'size:1kb' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should faile with path', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'size:1kb' }, { 'file.size': 'Max 1kb size is allowed.' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should faile with path', async () => {
    const v = new Validator(
      { file: { size: 2300 } }, { file: 'size:5kb,4kb' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw exception invalid context', async () => {
    try {
      const v = new Validator(
        { file: { ok: true } }, { file: 'size:1kb' },
      );

      await v.check();
      throw new Error('Invalid context.');
    } catch (e) {
      assert.equal(e, 'Error: Size rule only accepts Buffer,file path or size property in file object.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'size:1kb' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.file.message,
      v.getExistinParsedMessage({
        rule: 'size',
        value: '',
        attr: 'file',
        args: ['1kb'],
      }),
    );
  });
});
