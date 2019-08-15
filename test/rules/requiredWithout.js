const assert = require('assert');

const Validator = require('../../index');


describe('requiredWithout', () => {
  it('should return false for missing seed length', async () => {
    try {
      const v = new Validator({ age: 16 }, { remember: 'requiredWithout' });
      await v.check();
    } catch (e) {
      assert.equal(e, 'Invalid arguments supplied for field remember in requiredWithout rule.');
    }

    // assert.equal(v.errors.remember.message, v.parseExistingMessageOnly('requiredIf', 'remember', '', ['age', '16']));
  });

  it('should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', sex: '', age: '26' },
      { sex: 'requiredWithout:age' }
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', sex: 'male', age: '26' },
      { sex: 'requiredWithout:age' }
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fails', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh' },
      { sex: 'requiredWithout:age' }
    );

    const matched = await v.check();
    assert.equal(matched, false);

    assert.equal(v.errors.sex.message, v.parseExistingMessageOnly('requiredWithout', 'sex', '', 4));

    // should(v.errors).be.an.instanceOf(Object);
    // should(v.errors).have.property('sex');
  });
});
