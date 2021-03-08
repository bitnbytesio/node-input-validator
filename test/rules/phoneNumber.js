const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('phoneNumber', () => {
  it('should pass', async () => {
    const v = new Validator({ id: '+918699987073' }, { id: 'phoneNumber' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with hypens', async () => {
    const v = new Validator({ id: '+1-541-754-3010' }, { id: 'phoneNumber' });
    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with string', async () => {
    const v = new Validator({ attribute: 'artisangang' }, { attribute: 'phoneNumber' });

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'phoneNumber' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'phoneNumber',
        value: 'draft',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
