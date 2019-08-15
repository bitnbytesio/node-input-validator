const assert = require('assert');

const Validator = require('../../index');

describe('between: with integer', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { age: '19' },
      { age: 'between:16,21' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { age: '29' },
      { age: 'between:16,21' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // console.log(v.errors);
  });
});

describe('between: with float', () => {
  it('validation should pass: with float inputs and integer seeds', async () => {
    const v = new Validator(
      { price: '19.99' },
      { price: 'between:19,20' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with float inputs and mixed seeds', async () => {
    const v = new Validator(
      { price: '19.98' },
      { price: 'between:19,19.98' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: with float inputs and mixed seeds', async () => {
    const v = new Validator(
      { price: '19.99' },
      { price: 'between:19,19.89' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // console.log(v.errors);
  });
});

describe('between: with array', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'between:3,5' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail', async () => {
    const v = new Validator(
      { features: [1, 2] },
      { features: 'between:3,6' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.features.message, v.parseExistingMessageOnly('between', 'features', [1, 2], [3, 6]));
  });
});
