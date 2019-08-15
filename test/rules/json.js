const assert = require('assert');

const Validator = require('../../index');


describe('json', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '[1, 2, 3]' },
      { attribute: 'json' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'json' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('json', 'attribute', ''));
  });
});
