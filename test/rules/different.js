const assert = require('assert');


const { Validator } = require('../../lib/index');


describe('different', () => {
  it('should pass', async () => {
    const v = new Validator(
      { password: '000000', new_password: '123456' },
      { password: 'required', new_password: 'required|different:password' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator(
      { password: '000000', new_password: '000000' },
      { password: 'required', new_password: 'required|different:password' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { password: '000000', new_password: '000000' },
      { password: 'required', new_password: 'required|different:password' },
    );


    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.new_password.message,
      v.getExistinParsedMessage({
        rule: 'different',
        value: '',
        attr: 'new_password',
        args: ['password'],
      }),
    );
  });
});
