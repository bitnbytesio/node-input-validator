const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('alphaDash', () => {
  it('should pass with example', async () => {
    const v = new Validator(
      { username: 'example' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with example-test', async () => {
    const v = new Validator(
      { username: 'example-test' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should pass with alpha-numeric value', async () => {
    const v = new Validator(
      { username: 'now123' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with numbers', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with alpha, dash and numbers', async () => {
    const v = new Validator(
      { username: 'now-123' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with underscore', async () => {
    const v = new Validator(
      { username: 'u_name' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with special char', async () => {
    const v = new Validator(
      { username: 'u@name' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { username: 'u+name' },
      { username: 'alphaDash' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.username.message,
      v.getExistinParsedMessage({
        rule: 'alphaDash',
        value: 'u+name',
        attr: 'username',
      }),
    );
  });
});
