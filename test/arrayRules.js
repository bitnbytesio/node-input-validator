const assert = require('assert');

const { Validator } = require('../lib/index');

describe('Rules as Array', () => {
  it('should return false', async () => {
    const v = new Validator(
      { },
      {
        name: ['required'],
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should return true', async () => {
    const v = new Validator(
      { name: 'artisan' },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
      },
    );

    const matched = await v.check();

    // console.log(v.errors);

    assert.equal(matched, true);
  });

  it('should return false due to minLength failed', async () => {
    const v = new Validator(
      { name: 'art' },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should return false due to lengthBetween failed', async () => {
    const v = new Validator(
      { uid: 'abcdefghi' },
      {
        uid: ['required', ['lengthBetween', '5', '8'], 'alpha'],
      },
    );
    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('regex delimiters fix', async () => {
    const v = new Validator(
      { uid: 'xyz' },
      {
        uid: ['required', ['regex', 'abc|xyz']],
      },
    );
    const matched = await v.check();

    assert.equal(matched, true);
  });
});

describe('Rules as Mixed', () => {
  it('should return true', async () => {
    const v = new Validator(
      {
        name: 'artisan',
        email: 'artisangang@gmail.com',
        phone: '+918699987073',
        ip: '127.0.0.1',
      },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
        email: 'required|email',
        ip: ['ip'],
        phone: 'required|phoneNumber',
      },
    );

    const matched = await v.check();

    // console.log(v.errors);

    assert.equal(matched, true);
  });
});
