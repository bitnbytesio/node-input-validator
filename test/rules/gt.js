const assert = require('assert');

const Validator = require('../../index');


describe('gt', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer',
        max: 'required|integer|gt:min',
      }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { min: '30', max: '25' },
      {
        min: 'required|integer',
        max: 'required|integer|gt:min',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail due to nan in another field', async () => {
    const v = new Validator(
      { min: 'abc', max: '25' },
      {
        min: 'required',
        max: 'required|integer|gt:min',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });
});
