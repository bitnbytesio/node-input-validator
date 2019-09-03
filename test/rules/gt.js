const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('gt', () => {
  it('should pass', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer',
        max: 'required|integer|gt:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with min', async () => {
    const v = new Validator(
      { min: '30', max: '25' },
      {
        min: 'required|integer',
        max: 'required|integer|gt:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail due to nan in another field', async () => {
    const v = new Validator(
      { min: 'abc', max: '25' },
      {
        min: 'required',
        max: 'required|integer|gt:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { min: 'abc', max: 'abc' },
      {
        min: 'required',
        max: 'required|gt:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.max.message,
      v.getExistinParsedMessage({
        rule: 'gt',
        value: '25',
        attr: 'max',
        args: ['min'],
      }),
    );
  });
});
