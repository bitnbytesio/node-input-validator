const assert = require('assert');

const Validator = require('../../index');

describe('empty string', () => {
  it('should ignore empty string in not required fields', async () => {
    const v = new Validator({ field: 'test' }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should reject integer in string fields', async () => {
    const v = new Validator({ field: 1 }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject boolean in string fields', async () => {
    const v = new Validator({ field: true }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject boolean false in string fields', async () => {
    const v = new Validator({ field: false }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject array in string fields', async () => {
    const v = new Validator({ field: [1, 2] }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });

  it('should reject object in string fields', async () => {
    const v = new Validator({ field: {} }, { field: 'string' });

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(v.errors.field.message, v.parseExistingMessageOnly('string', 'field'));
  });

  it('should reject empty string in required fields', async () => {
    const v = new Validator({ field: '' }, { field: 'required|string' });

    const matched = await v.check();
    assert.equal(matched, false);
  });
});
