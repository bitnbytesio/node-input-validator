const assert = require('assert');

const Validator = require('../../index');


describe('min', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '20' },
      { attribute: 'min:20' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 20 },
      { attribute: 'min:20' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 20.55 },
      { attribute: 'min:20.50' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: '15' },
      { attribute: 'min:18' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('min', 'attribute', '', 18));
  });
});
