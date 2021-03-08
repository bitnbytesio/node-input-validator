const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('digits', () => {
  it('should pass with digits', async () => {
    const v = new Validator(
      { attr: '1250' },
      { attr: 'digits:4' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with alpha chars', async () => {
    const v = new Validator(
      { attr: 'abcd' },
      { attr: 'digits:4' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail short length', async () => {
    const v = new Validator(
      { attr: '123456' },
      { attr: 'digits:8' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with - in numbers', async () => {
    const v = new Validator(
      { attr: '1234-567' },
      { attr: 'digits:8' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with . in numbers', async () => {
    const v = new Validator(
      { attr: '120.56' },
      { attr: 'digits:6' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digits:test' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Please provide a numeric value for attribute under digits rule.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '123456' },
      { attr: 'digits:5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'digits',
        value: '123456',
        attr: 'attr',
        args: [5],
      }),
    );
  });
});
