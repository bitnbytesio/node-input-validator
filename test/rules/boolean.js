const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('boolean', () => {
  it('should pass with boolean(true/false)', async () => {
    const v = new Validator(
      { a: true, b: false },
      { a: 'boolean', b: 'boolean' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with String(true,false)', async () => {
    const v = new Validator(
      { a: 'false', b: 'false' },
      { a: 'boolean', b: 'boolean' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with Int(0,1)', async () => {
    const v = new Validator(
      { a: 0, b: 1 },
      { a: 'boolean', b: 'boolean' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with custom seed', async () => {
    const v = new Validator(
      { a: 'yes', b: 'no' },
      { a: 'boolean:yes,no', b: 'boolean:yes,no' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail invalid value', async () => {
    const v = new Validator(
      { a: 'not accepted' },
      { a: 'boolean' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { featured: {} },
      { featured: 'boolean' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.featured.message,
      v.getExistinParsedMessage({
        rule: 'boolean',
        value: {},
        attr: 'featured',
      }),
    );
  });
});
