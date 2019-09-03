const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('lengthBetween', () => {
  it('should pass with string', async () => {
    const v = new Validator(
      { age: 'unamea' },
      { age: 'lengthBetween:5,10' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail min length', async () => {
    const v = new Validator(
      { age: 'name' },
      { age: 'lengthBetween:5,21' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with array', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'lengthBetween:3,5' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with array min len', async () => {
    const v = new Validator(
      { features: [1, 2] },
      { features: 'lengthBetween:3,6' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed count exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:a' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: The number of arguments for length between in the field attribute are invalid.');
    }
  });


  it('should throw invalid min seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:a,10' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be integer for lengthBetween rule.');
    }
  });

  it('should throw invalid max seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|lengthBetween:10,b' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be integer for lengthBetween rule.');
    }
  });


  it('should throw min must be less then max seed exception', async () => {
    try {
      const v = new Validator({ attribute: '789456' }, { attribute: 'required|lengthBetween:10,5' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed min must be less then max in lengthBetween.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'lengthBetween:2,3' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.features.message,
      v.getExistinParsedMessage({
        rule: 'lengthBetween',
        value: [1, 2, 3, 4, 5],
        attr: 'features',
        args: [2, 3],
      }),
    );
  });
});
