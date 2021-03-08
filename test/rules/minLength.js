const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('minLength', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: 'uname' },
      { attr: 'minLength:5' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { attr: 'uname' },
      { attr: 'minLength:6' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|minLength:test' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed in minLength rule for attribute must be a number.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'minLength:10' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'minLength',
        value: 'string',
        attr: 'attr',
        args: [10],
      }),
    );
  });
});
