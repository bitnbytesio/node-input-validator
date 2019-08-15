const assert = require('assert');

const Validator = require('../../index');


describe('lt', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { min: '20', max: '25' },
      {
        min: 'required|integer|lt:max',
        max: 'required|integer',
      }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { min: '30', max: '25' },
      {
        min: 'required|integer|lt:max',
        max: 'required|integer',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail due to nan in another field', async () => {
    const v = new Validator(
      { min: '30', max: 'abc' },
      {
        min: 'required|integer|lt:max',
        max: 'required',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });
});
