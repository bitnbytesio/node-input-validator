const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('string', () => {
  it('should reject integer in string fields', async () => {
    const v = new Validator({ atr: 1 }, { atr: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject boolean in string fields', async () => {
    const v = new Validator({ attr: true }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject boolean false in string fields', async () => {
    const v = new Validator({ attr: false }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject array in string fields', async () => {
    const v = new Validator({ attr: [1, 2] }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject object in string fields', async () => {
    const v = new Validator({ attr: {} }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should pass', async () => {
    const v = new Validator({ attr: 'string' }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should ignore empty string in not required fields', async () => {
    const v = new Validator({ attr: '' }, { attr: 'string' });

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should reject empty string in required fields', async () => {
    const v = new Validator({ attr: '' }, { attr: 'required|string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator({ attr: 15.50 }, { attr: 'string' });

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'string',
        value: '',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
