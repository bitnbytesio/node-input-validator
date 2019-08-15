const assert = require('assert');

const Validator = require('../../index');


describe('acceptedIf', () => {
  it('validation should pass: with yes', async () => {
    const v = new Validator(
      { attribute: 'yes', age: 16 },
      { attribute: 'acceptedIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation pass, if condition fails', async () => {
    const v = new Validator(
      { attribute: '' },
      { attribute: 'acceptedIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation pass, if condition pass', async () => {
    const v = new Validator(
      { attribute: 'yes' },
      { attribute: 'acceptedIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation pass, if condition fails for no', async () => {
    const v = new Validator(
      { attribute: 'no', age: 16 },
      { attribute: 'acceptedIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: 'no', age: 16 },
      { attribute: 'acceptedIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attribute.message,
      v.parseExistingMessageOnly('acceptedIf', 'attribute', 'no', ['age', '16'])
    );
  });
});
