const assert = require('assert');

const Validator = require('../../index');


describe('length', () => {
  it('validation should pass: abc with max', async () => {
    const v = new Validator(
      { features: 'abc' },
      { features: 'length:3' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: abcd with min and max', async () => {
    const v = new Validator(
      { features: 'abcd' },
      { features: 'length:5,3' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: [1,2,3]', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'length:3' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: [1,2,3,4] with min and max', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:5,3' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: [1,2,3]', async () => {
    const v = new Validator(
      { features: [1, 2, 3] },
      { features: 'length:2' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: [1,2,3,4] with min length', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:6,5' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail: [1,2,3,4] with max length', async () => {
    const v = new Validator(
      { features: [1, 2, 3, 4] },
      { features: 'length:2,3' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });
});
