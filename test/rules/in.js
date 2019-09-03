const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('in', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: 'public' },
      { attr: 'in:private,public,draft' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with single', async () => {
    const v = new Validator(
      { attr: 'public' },
      { attr: 'in:public' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail with missing one', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'in:public,private' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'in:public,private' },
    );
    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'in',
        value: 'draft',
        attr: 'attr',
        args: ['public', 'private'],
      }),
    );
  });
});
