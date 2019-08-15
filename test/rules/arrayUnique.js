const assert = require('assert');

const Validator = require('../../index');


describe('arrayUnique', () => {
  it('validation should fail with non array', async () => {
    const v = new Validator(
      { features: 'test' },
      { features: 'arrayUnique' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('validation should pass: []', async () => {
    const v = new Validator(
      { features: [] },
      { features: 'arrayUnique' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with [1,2,3]', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'arrayUnique' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail for duplicates', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 1] },
      { features: 'arrayUnique' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { features: 'no' },
      { features: 'arrayUnique' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.features.message, v.parseExistingMessageOnly('arrayUnique', 'features'));
  });
});
