const assert = require('assert');

const { Validator, bailable } = require('../lib/index');

describe('Non bailable', () => {
  it('should return multiple errors', async () => {
    // bailable(false);
    const v = new Validator(
      { name: '12' },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
      },
    );

    v.bail(false);

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(Array.isArray(v.errors.name), true);
  });

  it('should toggle multiple errors on current instance', async () => {
    // bailable(false);
    const v = new Validator(
      { name: '12' },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
      },
    );

    v.bail(false);

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(Array.isArray(v.errors.name), true);

    v.bail(true);

    const matchedAgain = await v.check();

    assert.equal(matchedAgain, false);
    assert.equal(!Array.isArray(v.errors.name), true);
  });

  it('should toggle multiple errors', async () => {
    // enable multiple errors
    bailable(false);
    const v = new Validator(
      { name: 'art' },
      {
        name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha'],
      },
    );

    // multiple errors should be enabled
    assert.equal(v.breakWhenFailed, false);

    // disable mutliple errors
    bailable(true);

    // global disable should not effect pre-created instance
    assert.equal(v.breakWhenFailed, false);

    // disable current instance multiple errors
    v.bail(true);

    // multiple errors should be turned off
    assert.equal(v.breakWhenFailed, true);
  });
});
