const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('ascii', () => {
  it('should pass with ascii chars', async () => {
    const v = new Validator(
      { username: 'sfsf46546*/-=-!@#$%^&*()_+!?><:"{}[];' },
      { username: 'ascii' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with non ascii char', async () => {
    const v = new Validator(
      { username: 'uname€' },
      { username: 'ascii' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { username: 'uname€' },
      { username: 'ascii' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.username.message,
      v.getExistinParsedMessage({
        rule: 'ascii',
        value: {},
        attr: 'username',
      }),
    );
  });
});
