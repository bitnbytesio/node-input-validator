const assert = require('assert');

const Validator = require('../../index');


describe('nullable', () => {
  it('should fail', async () => {
    const v = new Validator(
      { attribute: 'email' },
      { attribute: 'nullable|email' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('nullable', 'attribute', '',4));
  });

  it('attribute absent, should fail', async () => {
    const v = new Validator(
      {},
      { attribute: 'nullable|email' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should pass', async () => {
    const v = new Validator(
      { attribute: null },
      { attribute: 'nullable|email' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { attribute: null },
      { attribute: 'nullable|alpha|required' }
    );

    const matched = await v.check();


    assert.equal(matched, true);
  });
});
