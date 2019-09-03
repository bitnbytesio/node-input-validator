const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('base64', () => {
  it('should pass with valida base64 string', async () => {
    const v = new Validator(
      { username: 'dGhpcyBpcyB0ZXN0aW5nLi4u' },
      { username: 'base64' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with invalid base64 string', async () => {
    const v = new Validator(
      { username: 'gYhKkdInjUnjUUmkH' },
      { username: 'base64' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { username: 'gYhKkdInjUnjUUmkH' },
      { username: 'base64' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.username.message,
      v.getExistinParsedMessage({
        rule: 'base64',
        value: 'gYhKkdInjUnjUUmkH',
        attr: 'username',
      }),
    );
  });
});
