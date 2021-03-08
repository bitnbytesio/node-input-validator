const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('alphaNumeric', () => {
  it('should pass with example', async () => {
    const v = new Validator(
      { username: 'example' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with alpha-numeric', async () => {
    const v = new Validator(
      { username: 'now123' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with special char', async () => {
    const v = new Validator(
      { username: 'u@name' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with numbers', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with underscore', async () => {
    const v = new Validator(
      { username: 'u_name' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { username: 'u-name' },
      { username: 'alphaNumeric' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.username.message,
      v.getExistinParsedMessage({
        rule: 'alphaNumeric',
        value: 'u-name',
        attr: 'username',
      }),
    );
  });
});
