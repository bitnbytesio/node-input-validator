const assert = require('assert');


const Validator = require('../../index');

describe('requiredIf', () => {
  it('single seed test: should return true', async () => {
    const v = new Validator({ name: 'Harcharan Singh', sex: 'male', age: 16 }, { sex: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('with nested seed: should return true', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        address: { street: 'fantastic' },
        age: 16,
      },
      {
        age: 'requiredIf:address.street,fantastic',
      }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });
  it('with nested seed: should return false', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        address: {
          street: 'fantastic',
        },
      },
      {
        age:
          'requiredIf:address.street,fantastic',
      }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('with false as string: should return true', async () => {
    const v = new Validator({ remember: 'false', age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('with false as boolean: should return true', async () => {
    const v = new Validator({ remember: false, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('with 0 as int: should return true', async () => {
    const v = new Validator({ remember: 0, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('with true as boolean: should return true', async () => {
    const v = new Validator({ remember: true, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should return false for invalid seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredIf:age' });

      await v.check();
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredIf rule.');
    }

    // assert.equal(v.errors.remember.message, v.parseExistingMessageOnly('requiredIf', 'remember', '', ['age', '16']));
  });

  it('should return false for missing seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredIf' });

      await v.check();
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredIf rule.');
    }

    // assert.equal(v.errors.remember.message, v.parseExistingMessageOnly('requiredIf', 'remember', '', ['age', '16']));
  });

  it('should return false', async () => {
    const v = new Validator({ age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.remember.message, v.parseExistingMessageOnly('requiredIf', 'remember', '', ['age', '16']));
  });

  it('should return false', async () => {
    let v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

    let matched = await v.check();

    assert.equal(matched, false);

    // should(v.errors).be.an.instanceOf(Object);
    // should(v.errors).have.property('sex');

    v = new Validator({ name: 'Harcharan Singh', age: '16' }, { sex: 'requiredIf:age,16' });

    matched = await v.check();

    assert.equal(matched, false);
  });

  it('with multiple fields', async () => {
    let v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        email: 'artisangang@gmail.com',
      },
      {
        email: 'requiredIf:age,16,parent,yes,type,subscribed',
      }
    );

    let matched = await v.check();

    assert.equal(matched, true);


    v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
      },
      {
        email: 'requiredIf:age,16,parent,yes,type,subscribed',
      }
    );

    matched = await v.check();

    assert.equal(matched, false);

    // should(v.errors).be.an.instanceOf(Object);
    // should(v.errors).have.property('email');
  });
});
