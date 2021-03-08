const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('digitsBetween', () => {
  it('should pass with min length', async () => {
    const v = new Validator(
      { attr: '1250' },
      { attr: 'digitsBetween:4,6' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with max length', async () => {
    const v = new Validator(
      { attr: '125012' },
      { attr: 'digitsBetween:4,6' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with min length', async () => {
    const v = new Validator(
      { attr: '1' },
      { attr: 'digitsBetween:2,3' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with max length', async () => {
    const v = new Validator(
      { attr: '123456' },
      { attr: 'digitsBetween:2,3' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw seed count exception', async () => {
    try {
      const v = new Validator({ attribute: '789456' }, { attribute: 'required|digitsBetween:a' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: The number of arguments for digitsBetween rule in the field attribute are invalid.');
    }
  });

  it('should throw invalid min seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digitsBetween:a,10' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be integer for attribute under digitsBetween rule.');
    }
  });

  it('should throw invalid max seed exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|digitsBetween:10,b' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seeds must be integer for attribute under digitsBetween rule.');
    }
  });

  it('should throw min must be less then max seed exception', async () => {
    try {
      const v = new Validator({ attribute: '789456123' }, { attribute: 'required|digitsBetween:10,5' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Seed min must be less then max in digitsBetween rule for attribute.');
    }
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'asdfd' },
      { attr: 'digitsBetween:2,3' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'digitsBetween',
        value: 'asdfd',
        attr: 'attr',
        args: [2, 3],
      }),
    );
  });
});
