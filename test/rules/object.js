const assert = require('assert');
const { Validator } = require('../../lib/index');


describe('object', () => {
  it('should pass with empty {}', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'object' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { features: { status: 'draft' } },
      { features: 'object' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail with string', async () => {
    const v = new Validator(
      { features: 'no' },
      { features: 'object' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'object' },
    );


    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'object',
        value: 'draft',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
