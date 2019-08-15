const assert = require('assert');

const Validator = require('../../index');

describe('#requiredNotIf', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', age: '16' },
      { sex: 'requiredNotIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });
  it('validation should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', address: { street: 'fantastic' } },
      { age: 'requiredNotIf:address.street,fantastic' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', age: 15, sex: 'male' },
      { sex: 'requiredNotIf:age,16' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });
  it('validation should fail', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', address: { street: 'fantastic' }, age: 15 },
      { age: 'requiredNotIf:address.street,fantastic' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  // should(v.errors).be.an.instanceOf(Object);
  // should(v.errors).have.property('sex');

  it('validation should pass', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        // email: 'artisangang@gmail.com'
      },
      {
        email: 'requiredNotIf:age,16,parent,yes,type,subscribed',
      }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        email: 'artisangang@gmail.com',
      },
      {
        email: 'requiredNotIf:age,16,parent,yes,type,subscribed',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(v.errors.email.message, v.parseExistingMessageOnly('requiredNotIf', 'email', '', 4));

    // should(v.errors).be.an.instanceOf(Object);
    // should(v.errors).have.property('email');
  });
});
