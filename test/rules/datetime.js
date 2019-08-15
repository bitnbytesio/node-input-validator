const assert = require('assert');

const Validator = require('../../index');


describe('datetime', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '2019-07-01 10:10:00' },
      { attribute: 'datetime' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid format', async () => {
    const v = new Validator(
      { attribute: '01/26/2018' },
      { attribute: 'datetime' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: '12 12 18' },
      { attribute: 'datetime' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('datetime', 'attribute'));
  });
});
