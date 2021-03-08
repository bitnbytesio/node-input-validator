const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('alpha', () => {
  it('should pass with example', async () => {
    const v = new Validator(
      { username: 'example' },
      { username: 'alpha' },
    );

    const matched = await v.check();

    assert.strictEqual(matched, true);
  });

  it('should pass with example', async () => {
    const v = new Validator(
      { username: 'está' },
      { username: 'alpha:pt-BR' },
    );

    const matched = await v.check();

    assert.strictEqual(matched, true);
  });

  it('should fail with alpha-numeric value', async () => {
    const v = new Validator(
      { username: 'now123' },
      { username: 'alpha' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with special char', async () => {
    const v = new Validator(
      { username: 'u@name' },
      { username: 'alpha' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with numbers', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alpha' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alpha' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.username.message,
      v.getExistinParsedMessage({
        rule: 'alpha',
        value: '123',
        attr: 'username',
      }),
    );
  });
});
