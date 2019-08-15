const assert = require('assert');

const Validator = require('../../index');


describe('decimal', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '12.50' },
      { attribute: 'decimal' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 12.55 },
      { attribute: 'decimal' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 12 },
      { attribute: 'decimal' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass with 0 as integer', async () => {
    const v = new Validator(
      { attribute: 0 },
      { attribute: 'required|decimal' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass with 0 as string', async () => {
    const v = new Validator(
      { attribute: '0' },
      { attribute: 'required|decimal' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalid val', async () => {
    const v = new Validator(
      { attribute: 'a12' },
      { attribute: 'decimal' }
    );

    const matched = await v.check();


    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('decimal', 'attribute'));
  });
});
