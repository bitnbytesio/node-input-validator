const assert = require('assert');

const Validator = require('../../index');

describe('maxLength', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'uname' },
      { attribute: 'maxLength:10' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'uname' },
      { attribute: 'maxLength:4' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('maxLength', 'attribute', '', 4));
  });
});
