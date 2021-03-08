const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('maxLength', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: 'uname' },
      { attr: 'maxLength:10' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with max length', async () => {
    const v = new Validator(
      { attr: 'uname' },
      { attr: 'maxLength:4' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|maxLength:test' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed in maxLength rule for attribute must be a number.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'maxLength:4' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'maxLength',
        value: 'string',
        attr: 'attr',
        args: [4],
      }),
    );
  });
});
