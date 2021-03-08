const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('acceptedNotIf', () => {
  it('should pass with no', async () => {
    const v = new Validator(
      { attr: 'no', age: 16 },
      { attr: 'acceptedNotIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with yes', async () => {
    const v = new Validator(
      { attr: 'yes', age: 16 },
      { attr: 'acceptedNotIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should throw exception', async () => {
    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedNotIf' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for attribute attribute in acceptedNotIf rule.');
    }

    try {
      const v = new Validator({ attribute: 'Harcharan Singh' }, { attribute: 'required|acceptedNotIf:1,2,3' });

      await v.check();

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Invalid arguments supplied for attribute attribute in acceptedNotIf rule.');
    }
  });

  it('message should exists', async () => {
    const v = new Validator(
      { attr: 'yes', age: 16 },
      { attr: 'acceptedNotIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'acceptedNotIf',
        value: 'yes',
        attr: 'attr',
        args: ['age', '16'],
      }),
    );
  });
});
