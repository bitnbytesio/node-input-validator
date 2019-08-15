const assert = require('assert');

const Validator = require('../../index');


describe('dateiso', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '2019-07-01T10:10:00' },
      { attribute: 'dateiso' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '2019-07-01T10:10:00.00Z' },
      { attribute: 'dateiso' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid format', async () => {
    const v = new Validator(
      { attribute: '01/26/2018' },
      { attribute: 'dateiso' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: '12 12 18' },
      { attribute: 'dateiso' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('dateiso', 'attribute'));
  });
});
