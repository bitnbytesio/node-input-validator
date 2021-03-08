const assert = require('assert');
const fs = require('fs');

const { Validator } = require('../../lib/index');

describe('dimensions', () => {
  it('should pass with exact dimension', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:minWidth=50,minHeight=32' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with  min height', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:minWidth=50,minHeight=50' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to min width', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:minWidth=100' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to max width', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:maxWidth=32' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to max height', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:maxHeight=30' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to exact height', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:width=100' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with excat width,height', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'dimensions:width=50,height=32' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with excat width,height', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'dimensions:width=50,height=50' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with buffer', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'dimensions:width:50' },
    );
    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with nested buffer', async () => {
    const v = new Validator(
      { file: { buffer: fs.readFileSync('./test/stubs/file-small.png') } }, { file: 'dimensions:width:50' },
    );
    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should throw exception', async () => {
    try {
      const v = new Validator(
        { file: ['test'] }, { file: 'dimensions:width:50' },
      );
      await v.check();
    } catch (e) {
      assert.equal(e, 'Error: Dimensions rule only accepts Buffer,file path or size property in file object.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'dimensions:width=50,height=50' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.file.message,
      v.getExistinParsedMessage({
        rule: 'dimensions',
        value: './test/stubs/file-small.png',
        attr: 'file',
        args: ['width=50', 'height=50'],
      }),
    );
  });
});
