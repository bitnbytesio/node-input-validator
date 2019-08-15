const assert = require('assert');

const Validator = require('../../index');


describe('base64', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { username: 'dGhpcyBpcyB0ZXN0aW5nLi4u' },
      { username: 'base64' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { username: 'gYhKkdInjUnjUUmkH' },
      { username: 'base64' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.username.message, v.parseExistingMessageOnly('base64', 'username'));
  });
});
