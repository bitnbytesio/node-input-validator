const assert = require('assert');

const Validator = require('../../index');

describe('mongoId', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '5c33010638eb95186574b64a' },
      { attribute: 'mongoId' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: '1945690' },
      { attribute: 'mongoId' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('mongoId', 'attribute', '', 4));
  });
});
