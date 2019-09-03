const assert = require('assert');


const { Validator } = require('../../lib/index');


describe('sometimes', () => {
  it('should fail', async () => {
    const v = new Validator(
      { password: '', confirm_password: 'password' },
      { password: 'sometimes', confirm_password: 'sometimes|alpha' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass', async () => {
    const v = new Validator(
      { password: '000000', confirm_password: '000000' },
      { password: 'sometimes', confirm_password: 'sometimes|same:password' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass, attribute absent', async () => {
    const v = new Validator(
      {},
      { password: 'sometimes', confirm_password: 'sometimes|same:password' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { password: '', confirm_password: 'password' },
      { password: 'sometimes', confirm_password: 'sometimes|alpha' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.password.message,
      v.getExistinParsedMessage({
        rule: 'sometimes',
        value: '',
        attr: 'password',
        args: [],
      }),
    );
  });
});
