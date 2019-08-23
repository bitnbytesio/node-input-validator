const assert = require('assert');
const fs = require('fs');

const Validator = require('../../index');

const mime = require('../../src/rules/mime');

describe('mime', () => {
  it('should return true', async () => {
    const v = new Validator(
      { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb|mime:png,jpg' }
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should return true', async () => {
    const v = new Validator(
      { file: './test/stubs/file-small.png' }, { file: 'size:4kb|mime:png,jpg' }
    );


    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should return false', async () => {
    const v = new Validator(
      { file: { buffer: fs.readFileSync('./test/stubs/file-small.png') } }, { file: 'mime:bmp' }
    );


    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should return false', async () => {
    const v = new Validator(
      { file: { path: './test/stubs/file-small.png' } }, { file: 'mime:gif,bmp' }
    );


    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.file.message, v.parseExistingMessageOnly('mime', 'file', '', ['gif', 'bmp']));
  });
});

describe('mime direct checks', () => {
  it('should return true', async () => {
    await mime('file', { mime: 'png' }, ['png']);
  });


  it('should return true', async () => {
    await mime('file', { type: 'png' }, ['png']);
  });


  it('should return true', async () => {
    await mime('file', { mimetype: 'png' }, ['png']);
  });

  it('should throw exception', async () => {
    try {
      await mime('file', {}, ['png']);
    } catch (e) {
      assert.equal(e, 'Error: MIME rule only accepts Buffer,file path or type/mime property in file object.');
    }
  });
});
