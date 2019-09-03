const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('email', () => {
  it('should pass with valid email', async () => {
    const v = new Validator(
      { attr: 'user@example.com' },
      { attr: 'email' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: 'form@example' },
      { attr: 'email' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'form@example' },
      { attr: 'email' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'email',
        value: 'form@example',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
