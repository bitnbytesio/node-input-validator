const assert = require('assert');

const Validator = require('../../index');


describe('regex', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { number: 'abc' }, { number: 'regex:[abc]' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail', async () => {
    const v = new Validator(
      { attribute: 'xyz' }, { attribute: 'regex:[abc]' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('regex', 'attribute', '', 4));
  });
});
