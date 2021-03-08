const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('lt', () => {
  it('should pass', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer|lt:max',
        max: 'required|integer',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { min: '30', max: '25' },
      {
        min: 'required|integer|lt:max',
        max: 'required|integer',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to nan in another field', async () => {
    const v = new Validator(
      { min: '30', max: 'abc' },
      {
        min: 'required|integer|lt:max',
        max: 'required',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { min: 'abc', max: 'abc' },
      {
        min: 'required|lt:max',
        max: 'required',
      },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.min.message,
      v.getExistinParsedMessage({
        rule: 'lt',
        value: '30',
        attr: 'min',
        args: ['max'],
      }),
    );
  });
});
