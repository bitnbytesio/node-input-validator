const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('length', () => {
  it('should passwith exact len', async () => {
    const v = new Validator(
      { features: 'abc' },
      { features: 'length:3' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with min len', async () => {
    const v = new Validator(
      { features: 'abcd' },
      { features: 'length:5,3' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with array of excat len', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'length:3' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with array of min length', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:5,3' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with array of max len', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'length:2' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with array of min len', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:6,5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:2,3' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.features.message,
      v.getExistinParsedMessage({
        rule: 'length',
        value: [1, 2, 3, 4],
        attr: 'features',
        args: [2, 3],
      }),
    );
  });
});
