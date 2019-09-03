const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('integer', () => {
  it('should pass with integer as string', async () => {
    const v = new Validator(
      { attr: '12' },
      { attr: 'integer' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with int', async () => {
    const v = new Validator(
      { attr: 12 },
      { attr: 'integer' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with decimal', async () => {
    const v = new Validator(
      { attr: 12.5 },
      { attr: 'integer' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should fail with string', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'integer' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'integer' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'integer',
        value: 'draft',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
