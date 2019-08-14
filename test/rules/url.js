const assert = require('assert');

const Validator = require('../../index');


describe('#same', () => {
  it('#url', async () => {
    const v = new Validator({ url: 'http://www.github.com' }, { url: 'required|url' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail', async () => {
    const v = new Validator({ url: 'artisangang' }, { url: 'required|url' });

    const matched = await v.check();

    // throw {matched, e: v.errors, i: v.inputs, v: v.validations, m: require('validator').isURL('artisangng')};

    assert.equal(matched, false);

    assert.equal(v.errors.url.message, v.parseExistingMessageOnly('url', 'url'));
  });
});
