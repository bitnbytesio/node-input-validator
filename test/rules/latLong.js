const assert = require('assert');

const Validator = require('../../index');


describe('latLong', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '30.483997,76.593948' },
      { attribute: 'latLong' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'latLong' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('latLong', 'attribute', ''));
  });
});
