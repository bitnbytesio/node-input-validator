const assert = require('assert');

const Validator = require('../../index');


describe('max', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '20' },
      { attribute: 'max:20' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: '19' },
      { attribute: 'max:18' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('max', 'attribute', '', 18));
  });
});
