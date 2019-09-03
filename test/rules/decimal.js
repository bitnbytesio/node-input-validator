const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('decimal', () => {
  it('should pass with numbers in string', async () => {
    const v = new Validator(
      { attr: '12.50' },
      { attr: 'decimal' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with number value', async () => {
    const v = new Validator(
      { attr: 12.55 },
      { attr: 'decimal' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with integer value', async () => {
    const v = new Validator(
      { attr: 12 },
      { attr: 'decimal' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with 0 as integer', async () => {
    const v = new Validator(
      { attr: 0 },
      { attr: 'required|decimal' },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should pass with 0 as string', async () => {
    const v = new Validator(
      { attr: '0' },
      { attr: 'required|decimal' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'a12' },
      { attr: 'decimal' },
    );

    const matched = await v.check();


    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'decimal',
        value: 'a12',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
