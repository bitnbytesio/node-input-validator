const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('gte', () => {
  it('should pass with greater seed', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer',
        max: 'required|integer|gte:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with equal', async () => {
    const v = new Validator(
      { min: '20', max: '20' },
      {
        min: 'required|integer',
        max: 'required|integer|gte:min',
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
        max: 'required|integer|gte:min',
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
        max: 'required|integer|gte:min',
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
        max: 'required|gte:min',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.max.message,
      v.getExistinParsedMessage({
        rule: 'gte',
        value: '25',
        attr: 'max',
        args: ['min'],
      }),
    );
  });
});
