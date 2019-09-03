const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('regex', () => {
  it('should pass', async () => {
    const v = new Validator(
      { number: 'abc' }, { number: 'regex:[abc]' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attribute: 'xyz' }, { attribute: 'regex:[abc]' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { attr: '123' },
      { attr: 'regex:[abc]' },
    );


    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'regex',
        value: '123',
        attr: 'attr',
        args: ['[abc]'],
      }),
    );
  });
});
