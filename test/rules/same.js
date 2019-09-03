const assert = require('assert');


const { Validator } = require('../../lib/index');


describe('same', () => {
  it('should pass', async () => {
    const v = new Validator(
      { password: '000000', confirm_password: '000000' },
      { password: 'required', confirm_password: 'required|same:password' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { password: '000000', confirm_password: '123456' },
      { password: 'required', confirm_password: 'required|same:password' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { password: '000000', confirm_password: '123456' },
      { password: 'required', confirm_password: 'required|same:password' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.confirm_password.message,
      v.getExistinParsedMessage({
        rule: 'same',
        value: '',
        attr: 'confirm_password',
        args: ['password'],
      }),
    );
  });
});
