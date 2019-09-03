const assert = require('assert');


const { Validator } = require('../../lib/index');


describe('url', () => {
  it('should pass', async () => {
    const v = new Validator({ url: 'http://www.github.com' }, { url: 'required|url' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator({ url: 'artisangang' }, { url: 'required|url' });

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator({ url: '123456' }, { url: 'required|url' });

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.url.message,
      v.getExistinParsedMessage({
        rule: 'url',
        value: '',
        attr: 'url',
        args: [],
      }),
    );
  });
});
