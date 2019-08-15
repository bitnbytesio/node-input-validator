const assert = require('assert');

const Validator = require('../../index');


describe('acceptedNotIf', () => {
  it('validation should pass: with yes', async () => {
    const v = new Validator(
      { attribute: 'no', age: 16 },
      { attribute: 'acceptedNotIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail', async () => {
    const v = new Validator(
      { attribute: 'yes', age: 16 },
      { attribute: 'acceptedNotIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attribute.message,
      v.parseExistingMessageOnly('acceptedNotIf', 'attribute', 'yes', ['age', '16'])
    );
  });
});
