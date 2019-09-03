const assert = require('assert');
const { Validator } = require('../../lib/index');

describe('json', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '[1, 2, 3]' },
      { attr: 'json' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail with string', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'json' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'json' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'json',
        value: 'string',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
