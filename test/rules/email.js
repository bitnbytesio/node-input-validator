const assert = require('assert');

const Validator = require('../../index');


describe('email', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'user@example.com' },
      { attribute: 'email' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'form@example' },
      { attribute: 'email' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('email', 'attribute', ''));
  });
});
