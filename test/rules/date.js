const assert = require('assert');

const Validator = require('../../index');


describe('date', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '2018-12-26' },
      { attribute: 'date' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid format', async () => {
    const v = new Validator(
      { attribute: '01/26/2018' },
      { attribute: 'date' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: '12 12 18' },
      { attribute: 'date' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('date', 'attribute'));
  });
});
