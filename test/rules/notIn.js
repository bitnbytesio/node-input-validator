const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('notIn', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attribute: 'public' },
      { attribute: 'notIn:private,draft' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail: misnotIng attribute', async () => {
    const v = new Validator(
      { attribute: 'draft' },
      { attribute: 'notIn:public,draft' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'draft' },
      { attr: 'notIn:draft,public,private' },
    );
    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'notIn',
        value: 'draft',
        attr: 'attr',
        args: ['draft', 'public', 'private'],
      }),
    );
  });
});
