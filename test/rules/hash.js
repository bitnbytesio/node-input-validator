const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('hash', () => {
  it('should pass with md5', async () => {
    const v = new Validator(
      { attr: '46f8fb7d635cb71beafe8fe580c56164' },
      { attr: 'hash:md5' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with plain text', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'hash:md5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '123456456789' },
      { attr: 'hash:md5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'hash',
        value: '123456456789',
        attr: 'attr',
        args: ['md5'],
      }),
    );
  });
});
