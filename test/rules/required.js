const assert = require('assert');


const { Validator } = require('../../lib/index');

describe('#required', () => {
  it('should pass', async () => {
    const v = new Validator({ name: 'Harcharan Singh' }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with empty string', async () => {
    const v = new Validator({ name: '' }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass with 0 as integer', async () => {
    const v = new Validator({ name: 0 }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with 0 as string', async () => {
    const v = new Validator({ name: '0' }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with false as boolean', async () => {
    const v = new Validator({ name: false }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass with false as string', async () => {
    const v = new Validator({ name: 'false' }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('message should exist', async () => {
    const v = new Validator({ name: '' }, { name: 'required' });

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.name.message,
      v.getExistinParsedMessage({
        rule: 'required',
        value: '',
        attr: 'name',
        args: [],
      }),
    );
  });
});
