const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('accepted', () => {
  it('should pass with yes', async () => {
    const v = new Validator(
      { attr: 'yes' },
      { attr: 'accepted' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with ok using custom options', async () => {
    const v = new Validator(
      { attr: 'ok' },
      { attr: 'accepted:ok' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail using no', async () => {
    const v = new Validator(
      { attr: 'no' },
      { attr: 'accepted' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      {},
      { attr: 'accepted' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'accepted',
        value: undefined,
        attr: 'attr',
      }),
    );
  });
});
