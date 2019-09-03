const assert = require('assert');
const fs = require('fs');

const { Validator } = require('../../lib/index');

const mime = require('../../lib/rules/mime');

describe('mime', () => {
  it('should pass', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'mime:png,jpg' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail, using buffer', async () => {
    const v = new Validator(
      { file: { buffer: fs.readFileSync('./test/stubs/file-small.png') } }, { file: 'mime:bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail, using path', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'mime:gif,bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail, path as string', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'mime:gif,bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass, with manual mime', async () => {
    const v = new Validator(
      { file: { mime: 'image/gif' } }, { file: 'mime:gif,bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass, with manual type', async () => {
    const v = new Validator(
      { file: { type: 'image/gif' } }, { file: 'mime:gif,bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass, with manual mimetype', async () => {
    const v = new Validator(
      { file: { mimetype: 'image/gif' } }, { file: 'mime:gif,bmp' },
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should throw exception', async () => {
    try {
      await mime({ value: {}, args: ['png'] });
    } catch (e) {
      assert.equal(e, 'Error: MIME rule only accepts Buffer,file path or type/mime property in file object.');
    }
  });
});
