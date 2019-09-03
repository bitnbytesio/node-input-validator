const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('dateFormat', () => {
  it('should pass with valid date', async () => {
    const v = new Validator(
      { attr: '2018-12-26' },
      { attr: 'dateFormat:YYYY-MM-DD' },
    );

    const matched = await v.passes();

    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      { attr: '2018/01/26' },
      { attr: 'dateFormat:YYYY/MM/DD' },
    );

    const matched = await v.passes();

    assert.equal(matched, true);
  });

  it('should fail with invalid format', async () => {
    const v = new Validator(
      { attr: '12 12 18' },
      { attr: 'dateFormat:YYYY-MM-DD' },
    );

    const matched = await v.fails();

    assert.equal(matched, true);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: '28/08/2019' },
      { attr: 'dateFormat:YYYY-MM-DD' },
    );

    const matched = await v.fails();

    assert.equal(matched, true);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'dateFormat',
        value: '28/08/2019',
        attr: 'attr',
        args: ['YYYY-MM-DD'],
      }),
    );
  });
});
