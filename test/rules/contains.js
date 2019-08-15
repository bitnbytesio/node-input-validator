const assert = require('assert');

const Validator = require('../../index');


describe('contains', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'This package is awesome.' },
      { attribute: 'contains:package' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'contains:yes' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('contains', 'attribute', '', 'yes'));
  });
});
