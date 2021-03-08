const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('creditCard', () => {
  it('should pass with visa card', async () => {
    const v = new Validator(
      { cc: '4111111111111111' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with spaced visa card', async () => {
    const v = new Validator(
      { cc: '4111 1111 1111 1111' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with master card', async () => {
    const v = new Validator(
      { cc: '5500 0000 0000 0004' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with amex', async () => {
    const v = new Validator(
      { cc: '3400 0000 0000 009' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with invalid card', async () => {
    const v = new Validator(
      { cc: '412365' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { cc: '412365' },
      { cc: 'creditCard' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.cc.message,
      v.getExistinParsedMessage({
        rule: 'creditCard',
        value: '412365',
        attr: 'cc',
      }),
    );
  });
});
