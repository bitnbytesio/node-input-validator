const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('max', () => {
  it('should pass with string', async () => {
    const v = new Validator(
      { attr: '20' },
      { attr: 'max:20' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with integer', async () => {
    const v = new Validator(
      { attr: 18 },
      { attr: 'max:20' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { attr: '19' },
      { attr: 'max:18' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|max:test' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed in max rule for attribute must be a number.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'max:20' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'max',
        value: 'string',
        attr: 'attr',
        args: [20],
      }),
    );
  });
});
