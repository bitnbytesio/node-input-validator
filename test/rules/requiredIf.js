const assert = require('assert');


const { Validator } = require('../../lib/index');

describe('requiredIf', () => {
  it('should pass', async () => {
    const v = new Validator({ name: 'Harcharan Singh', sex: 'male', age: 16 }, { sex: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with false as string', async () => {
    const v = new Validator({ remember: 'false', age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with false as boolean', async () => {
    const v = new Validator({ remember: false, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with 0 as integer', async () => {
    const v = new Validator({ remember: 0, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with boolean true', async () => {
    const v = new Validator({ remember: true, age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should throw exceptin for invalid seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredIf:age' });

      await v.check();
      throw new Error('Invalid seed.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredIf rule.');
    }
  });

  it('should throw exceptin for invalid seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredIf:age,8,ok' });

      await v.check();
      throw new Error('Invalid seed.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredIf rule.');
    }
  });

  it('should throw exception for missing seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredIf' });

      await v.check();
      throw new Error('Invalid seed.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredIf rule.');
    }
  });

  it('should fails with missing attribute of seed', async () => {
    const v = new Validator({ age: 16 }, { remember: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fails', async () => {
    let v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

    let matched = await v.check();

    assert.equal(matched, false);

    v = new Validator({ name: 'Harcharan Singh', age: '16' }, { sex: 'requiredIf:age,16' });

    matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with multiple seeds', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        email: 'artisangang@gmail.com',
      },
      {
        email: 'requiredIf:age,16,parent,yes,type,subscribed',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with multiple seeds', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
      },
      {
        email: 'requiredIf:age,16,parent,yes,type,subscribed',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with nested seed', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        sex: '',
        private: {
          age: 15,
        },
      },
      {
        sex: 'requiredIf:private.age,16'
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with nested seed', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        sex: '',
        private: {
          age: 16,
        },
      },
      {
        sex: 'requiredIf:private.age,16'
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.sex.message,
      v.getExistinParsedMessage({
        rule: 'requiredIf',
        value: '',
        attr: 'sex',
        args: ['age', 16],
      }),
    );
  });
});
