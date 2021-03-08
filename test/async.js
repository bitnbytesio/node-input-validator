const assert = require('assert');

const niv = require('../lib/index');

const { Validator } = niv;

niv.extend('asyncIn', async ({ value, args }) => {
  const results = await new Promise((resolve) => {
    setTimeout(() => {
      if (args.indexOf(value) >= 0) {
        resolve(true);
        return;
      }

      resolve(false);
    }, 500);
  });
  return results;
});

describe('Async Rules', () => {
  it('should pass using async', async () => {
    const v = new Validator(
      { status: 'active' }, { status: 'asyncIn:active,inactive' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should pass using async and sync', async () => {
    const v = new Validator(
      { status: 'active' }, { status: 'string|asyncIn:active,inactive|ascii' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fails using async', async () => {
    const v = new Validator(
      { status: 'active' }, { status: 'asyncIn:activated,deactivated' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });
});
