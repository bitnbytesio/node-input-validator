const assert = require('assert');

const Validator = require('../../index');


describe('domain', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'example.com' },
      { attribute: 'domain' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'www.example.com' },
      { attribute: 'domain' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'http://www.example.com' },
      { attribute: 'domain' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'localhost' },
      { attribute: 'domain' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('domain', 'attribute', ''));
  });
});
