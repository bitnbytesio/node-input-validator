const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('datetime', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '2019-07-01 10:10:00' },
      { attr: 'datetime' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with invalid format', async () => {
    const v = new Validator(
      { attr: '01/26/2018' },
      { attr: 'datetime' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '12 12 18' },
      { attr: 'datetime' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'datetime',
        value: '12 12 18',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
