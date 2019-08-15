const assert = require('assert');

const Validator = require('../../index');


describe('macAddress', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '00:14:22:01:23:45' },
      { attribute: 'macAddress' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'macAddress' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('macAddress', 'attribute', ''));
  });
});
