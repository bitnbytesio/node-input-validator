const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('between', () => {
  it('should pass with integer', async () => {
    const v = new Validator(
      { age: '19' },
      { age: 'between:16,21' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with max seed', async () => {
    const v = new Validator(
      { age: '29' },
      { age: 'between:16,21' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with min seed', async () => {
    const v = new Validator(
      { age: '15' },
      { age: 'between:16,21' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with decimal input and integer seeds', async () => {
    const v = new Validator(
      { price: '19.99' },
      { price: 'between:19,20' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with decimal input and mixed seeds', async () => {
    const v = new Validator(
      { price: '19.98' },
      { price: 'between:19,19.98' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with max decimal seed', async () => {
    const v = new Validator(
      { price: '19.99' },
      { price: 'between:19,19.89' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with array length', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'between:3,5' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with array min length', async () => {
    const v = new Validator(
      { features: [1, 2] },
      { features: 'between:3,6' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with array max length', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4, 5, 6] },
      { features: 'between:3,5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw invalid seed count exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:a' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: The number of arguments for between in the field attribute are invalid.');
    }
  });

  it('should throw invalid min seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:a,10' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be numeric for attribute under between rule.');
    }
  });

  it('should throw invalid max seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:10,b' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be numeric for attribute under between rule.');
    }
  });

  it('should throw min must be less then max seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|between:10,5' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed min must be less then max in between rule for attribute.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attrs: 'abc' },
      { attrs: 'between:1,5' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attrs.message,
      v.getExistinParsedMessage({
        rule: 'between',
        value: {},
        attr: 'attrs',
        args: [1, 5],
      }),
    );
  });
});
