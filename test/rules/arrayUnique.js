const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('arrayUnique', () => {
  it('should fail with string', async () => {
    const v = new Validator(
      { features: 'test' },
      { features: 'arrayUnique' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should pass with empty array', async () => {
    const v = new Validator(
      { features: [] },
      { features: 'arrayUnique' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with filled array', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'arrayUnique' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail for duplicates values in array', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 1] },
      { features: 'arrayUnique' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'arrayUnique' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.features.message,
      v.getExistinParsedMessage({
        rule: 'arrayUnique',
        value: {},
        attr: 'features',
      }),
    );
  });
});
