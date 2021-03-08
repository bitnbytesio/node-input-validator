const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('domain', () => {
  it('should pass with example.com', async () => {
    const v = new Validator(
      { attr: 'example.com' },
      { attr: 'domain' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with www', async () => {
    const v = new Validator(
      { attr: 'www.example.com' },
      { attr: 'domain' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with http', async () => {
    const v = new Validator(
      { attr: 'http://www.example.com' },
      { attr: 'domain' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with string', async () => {
    const v = new Validator(
      { attr: 'localhost' },
      { attr: 'domain' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '123' },
      { attr: 'domain' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'domain',
        value: '123',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
