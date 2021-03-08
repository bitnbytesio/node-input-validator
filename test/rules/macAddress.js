const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('macAddress', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '00:14:22:01:23:45' },
      { attr: 'macAddress' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail: with string', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'macAddress' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'macAddress' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'macAddress',
        value: 'string',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
