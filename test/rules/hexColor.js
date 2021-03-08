const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('hexColor', () => {
  it('should pass', async () => {
    const v = new Validator(
      { attr: '#FFFFFF' },
      { attr: 'hexColor' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass short code', async () => {
    const v = new Validator(
      { attr: '#000' },
      { attr: 'hexColor' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass without hash', async () => {
    const v = new Validator(
      { attr: 'f00' },
      { attr: 'hexColor' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with plain text', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'hexColor' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { attr: 'Yes, Node is awesome' },
      { attr: 'hexColor' },
    );

    const matched = await v.check();
    assert.equal(matched, false);
    assert.equal(
      v.errors.attr.message,
      v.getExistinParsedMessage({
        rule: 'hexColor',
        value: 'Yes, Node is awesome',
        attr: 'attr',
        args: [],
      }),
    );
  });
});
