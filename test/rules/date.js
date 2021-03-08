const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('date', () => {
  it('should pass supported format', async () => {
    const v = new Validator(
      { attribute: '2018-12-26' },
      { attribute: 'date' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail not supported format', async () => {
    const v = new Validator(
      { attribute: '01/26/2018' },
      { attribute: 'date' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail with invalid value', async () => {
    const v = new Validator(
      { attribute: '12 12 18' },
      { attribute: 'date' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '12122018' },
      { attr: 'date' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'date',
        value: '12122018',
        attr: 'attr',
      }),
    );
  });
});
