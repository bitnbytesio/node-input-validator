const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('iso8601', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '2019-01-07T10:43:59Z' },
      { attr: 'iso8601' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'iso8601' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'iso8601' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'iso8601',
        value: 'string',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
