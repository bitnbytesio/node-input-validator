const assert = require('assert');

const Validator = require('../../index');


describe('alphaDash', () => {
  it('validation should pass: with example', async () => {
    const v = new Validator(
      { username: 'example' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with example-test', async () => {
    const v = new Validator(
      { username: 'example-test' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should pass: with now123', async () => {
    const v = new Validator(
      { username: 'now123' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with now-123', async () => {
    const v = new Validator(
      { username: 'now-123' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);

    // console.log(v.errors);
  });

  it('validation should fail: with u@name', async () => {
    const v = new Validator(
      { username: 'u@name' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.username.message, v.parseExistingMessageOnly('alphaDash', 'username'));
  });

  it('validation should fail: with 123', async () => {
    const v = new Validator(
      { username: '123' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);

    // console.log(v.errors);
  });

  it('validation should fail: with u_name', async () => {
    const v = new Validator(
      { username: 'u_name' },
      { username: 'alphaDash' }
    );

    const matched = await v.check();

    assert.equal(matched, true);

    // console.log(v.errors);
  });
});
