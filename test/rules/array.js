const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('array', () => {
  it('should pass with empty array', async () => {
    const v = new Validator(
      { features: [] },
      { features: 'array' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with filled array', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'array' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with string', async () => {
    const v = new Validator(
      { features: 'no' },
      { features: 'array' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'array' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.features.message,
      v.getExistinParsedMessage({
        rule: 'array',
        value: {},
        attr: 'features',
      }),
    );
  });
});
