const assert = require('assert');

const Validator = require('../../index');


describe('object', () => {
  it('validation should pass: []', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'object' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with [1,2,3]', async () => {
    const v = new Validator(
      { features: { status: 'draft' } },
      { features: 'object' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { features: 'no' },
      { features: 'object' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.features.message, v.parseExistingMessageOnly('object', 'features', '', 4));
  });
});
