const assert = require('assert');

const Validator = require('../../index');


describe('equals', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'yes' },
      { attribute: 'equals:yes' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'equals:no' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('equals', 'attribute', '', 'no'));
  });
});
