const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('ip', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attribute: '192.168.1.14' },
      { attribute: 'ip' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with string', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'ip' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '192.168 25.25' },
      { attr: 'ip' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'ip',
        value: '192.168 25.25',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
