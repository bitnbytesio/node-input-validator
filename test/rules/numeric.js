const assert = require('assert');

const Validator = require('../../index');


describe('numeric', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '12' },
      { attribute: 'numeric' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 12 },
      { attribute: 'numeric' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { attribute: 12.5 },
      { attribute: 'numeric' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail', async () => {
    const v = new Validator(
      { attribute: 'draft' },
      { attribute: 'numeric' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('numeric', 'attribute', '', 4));
  });
});
