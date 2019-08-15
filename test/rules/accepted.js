const assert = require('assert');

const Validator = require('../../index');


describe('accepted', () => {
  it('validation should pass: with yes', async () => {
    const v = new Validator(
      { attribute: 'yes' },
      { attribute: 'accepted' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with custom', async () => {
    const v = new Validator(
      { attribute: 'ok' },
      { attribute: 'accepted:ok' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: 'no' },
      { attribute: 'accepted' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attribute.message,
      v.parseExistingMessageOnly('accepted', 'attribute')
    );
  });

  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      {},
      { attribute: 'accepted' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attribute.message,
      v.parseExistingMessageOnly('accepted', 'attribute')
    );
  });
});
