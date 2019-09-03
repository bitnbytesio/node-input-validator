const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('nullable', () => {
  it('should fail', async () => {
    const v = new Validator(
      { attr: 'email' },
      { attr: 'nullable|email' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should fail, attr absent', async () => {
    const v = new Validator(
      {},
      { attr: 'nullable|email' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should pass, attr is null', async () => {
    const v = new Validator(
      { attr: null },
      { attr: 'nullable|email' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass, attr is null, ignore required', async () => {
    const v = new Validator(
      { attr: null },
      { attr: 'nullable|alpha|required' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });
});
