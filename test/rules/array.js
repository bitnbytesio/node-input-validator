const assert = require('assert');

const Validator = require('../../index');


describe('array', () => {
  it('validation should pass: []', async () => {
    const v = new Validator(
      { features: [] },
      { features: 'array' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with [1,2,3]', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'array' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { features: 'no' },
      { features: 'array' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.features.message, v.parseExistingMessageOnly('array', 'features'));
  });
});
