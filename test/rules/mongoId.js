const assert = require('assert');
const { Validator } = require('../../lib/index');

describe('mongoId', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '5c33010638eb95186574b64a' },
      { attr: 'mongoId' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: '1945690' },
      { attr: 'mongoId' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'mongoId' },
    );
    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'mongoId',
        value: 'string',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
