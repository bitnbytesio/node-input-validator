const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('hex', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '6e6f646520696e7075742076616c696461746f72' },
      { attr: 'hex' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'hex' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'hex' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'hex',
        value: 'Yes, Node is awesome',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
