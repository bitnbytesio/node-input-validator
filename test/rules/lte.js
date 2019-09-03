const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('lte', () => {
  it('should pass with greater seed', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer|lte:max',
        max: 'required|integer',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with equal', async () => {
    const v = new Validator(
      { min: '20', max: '20' },
      {
        min: 'required|integer|lte:max',
        max: 'required|integer',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { min: 'abc', max: '25' },
      {
        min: 'required|lte:max',
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
        min: 'required|integer|lte:max',
        max: 'required',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { min: '30', max: 'abc' },
      {
        min: 'required|integer|lte:max',
        max: 'required',
      },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.min.message,
      v.getExistinParsedMessage({
        rule: 'lte',
        value: '30',
        attr: 'min',
        args: ['max'],
      }),
    );
  });
});
