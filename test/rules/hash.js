const assert = require('assert');

const Validator = require('../../index');

describe('hash', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '46f8fb7d635cb71beafe8fe580c56164' },
      { attribute: 'hash:md5' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'hash:md5' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('hash', 'attribute', '', 'md5'));
  });
});
