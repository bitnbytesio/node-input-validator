const assert = require('assert');

const Validator = require('../../index');


describe('hex', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '6e6f646520696e7075742076616c696461746f72' },
      { attribute: 'hex' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'hex' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('hex', 'attribute', ''));
  });
});
