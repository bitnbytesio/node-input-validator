const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('dateiso', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '2019-07-01T10:10:00' },
      { attr: 'dateiso' },
    );

    const matched = await v.passes();

    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { attr: '2019-07-01T10:10:00.00Z' },
      { attr: 'dateiso' },
    );

    const matched = await v.passes();

    assert.equal(matched, true);
  });

  it('should fail with invalid format', async () => {
    const v = new Validator(
      { attr: '01/26/2018' },
      { attr: 'dateiso' },
    );

    const matched = await v.fails();

    assert.equal(matched, true);
  });

  it('should fail with invalid value', async () => {
    const v = new Validator(
      { attr: '12 12 18' },
      { attr: 'dateiso' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '12 12 18' },
      { attr: 'dateiso' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'dateiso',
        value: '12 12 18',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
