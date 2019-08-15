const assert = require('assert');

const Validator = require('../../index');


describe('alpha', () => {
  it('validation should pass: with example', async () => {
    const v = new Validator(
      { username: 'example' },
      { username: 'alpha' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: with now123', async () => {
    const v = new Validator(
      { username: 'now123' },
      { username: 'alpha' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.username.message, v.parseExistingMessageOnly('alpha', 'username'));
  });

  it('validation should fail: with u@name', async () => {
    const v = new Validator(
      { username: 'u@name' },
      { username: 'alpha' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // console.log(v.errors);
  });

  it('validation should fail: with 123', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alpha' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // console.log(v.errors);
  });
});
