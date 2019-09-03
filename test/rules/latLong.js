const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('latLong', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '30.483997,76.593948' },
      { attr: 'latLong' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'latLong' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'string' },
      { attr: 'latLong' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'latLong',
        value: 'string',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
