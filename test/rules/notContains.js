const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('notContains', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: 'This library is awesome.' },
      { attr: 'notContains:package' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'notContains:Yes' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'yes' },
      { attr: 'notContains:yes' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'notContains',
        value: 'ok',
        attr: 'attr',
        args: ['yes'],
      }),
    );
  });
});
