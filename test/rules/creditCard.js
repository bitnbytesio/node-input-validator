const assert = require('assert');

const Validator = require('../../index');


describe('creditCard', () => {
  it('validation should pass: visa', async () => {
    const v = new Validator(
      { cc: '4111111111111111' },
      { cc: 'creditCard' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: visa', async () => {
    const v = new Validator(
      { cc: '4111 1111 1111 1111' },
      { cc: 'creditCard' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: master', async () => {
    const v = new Validator(
      { cc: '5500 0000 0000 0004' },
      { cc: 'creditCard' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: ae', async () => {
    const v = new Validator(
      { cc: '3400 0000 0000 009' },
      { cc: 'creditCard' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { cc: '412365' },
      { cc: 'creditCard' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.cc.message, v.parseExistingMessageOnly('creditCard', 'cc'));
  });
});
