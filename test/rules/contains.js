const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('contains', () => {
  it('should pass with match', async () => {
    const v = new Validator(
      { attr: 'This package is awesome.' },
      { attr: 'contains:package' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with no-match', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'contains:yes' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: {} },
      { attr: 'contains:yes' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'contains',
        value: {},
        attr: 'attr',
        args: ['yes'],
      }),
    );
  });
});
