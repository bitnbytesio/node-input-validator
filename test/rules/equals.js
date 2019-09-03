const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('equals', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: 'yes' },
      { attr: 'equals:yes' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'equals:no' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'equals:no' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'equals',
        value: 'Yes, Node is awesome',
        attr: 'attr',
        args: ['no'],
      }),
    );
  });
});
