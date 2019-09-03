const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('min', () => {
  it('should pass with string', async () => {
    const v = new Validator(
      { attr: '20' },
      { attr: 'min:20' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with integer', async () => {
    const v = new Validator(
      { attr: 20 },
      { attr: 'min:20' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with decimal', async () => {
    const v = new Validator(
      { attr: 20.55 },
      { attr: 'min:20.50' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: '15' },
      { attr: 'min:18' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|min:test' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed in min rule for attribute must be a number.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'min:10' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'min',
        value: 'string',
        attr: 'attr',
        args: [10],
      }),
    );
  });
});
