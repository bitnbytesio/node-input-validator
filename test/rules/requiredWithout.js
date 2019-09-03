const assert = require('assert');


const { Validator } = require('../../lib/index');


describe('requiredWithout', () => {
  it('should return false for missing seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredWithout' });
      await v.check();
      throw new Error('Exception was expected.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for field remember in requiredWithout rule.');
    }
  });

  it('should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', sex: '', age: '26' },
      { sex: 'requiredWithout:age' },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', sex: 'male', age: '26' },
      { sex: 'requiredWithout:age' },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fails', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh' },
      { sex: 'requiredWithout:age' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh' },
      { sex: 'requiredWithout:age' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.sex.message,
      v.getExistinParsedMessage({
        rule: 'requiredWithout',
        value: '',
        attr: 'sex',
        args: ['age'],
      }),
    );
  });
});
