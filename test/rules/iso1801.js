const assert = require('assert');

const Validator = require('../../index');


describe('iso8601', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '2019-01-07T10:43:59Z' },
      { attribute: 'iso8601' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'iso8601' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iso8601', 'attribute', ''));
  });
});
