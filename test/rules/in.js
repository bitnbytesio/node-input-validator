const assert = require('assert');

const Validator = require('../../index');


describe('in', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'public' },
      { attribute: 'in:private,public,draft' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'public' },
      { attribute: 'in:public' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'draft' },
      { attribute: 'in:public,private' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('in', 'attribute', ''));
  });
});
