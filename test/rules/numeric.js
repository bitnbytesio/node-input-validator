const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('numeric', () => {
  it('should pass with numbers in string', async () => {
    const v = new Validator(
      { attr: '12' },
      { attr: 'numeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with integer', async () => {
    const v = new Validator(
      { attr: 12 },
      { attr: 'numeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with decimal', async () => {
    const v = new Validator(
      { attr: 12.5 },
      { attr: 'numeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with non numeric', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'numeric' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'numeric' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'numeric',
        value: 'draft',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
