const assert = require('assert');

const Validator = require('../../index');


describe('arrayUniqueObjects', () => {
  it('validation should fail with non array', async () => {
    const v = new Validator(
      { features: 'test' },
      { features: 'arrayUniqueObjects:id' }
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('validation should pass: with single attribute', async () => {
    const v = new Validator(
      {
        features: [{
          id: 1,
          name: 'ok',
        },
        {
          id: 2,
          name: 'ok2',
        }],
      },
      { features: 'array|arrayUniqueObjects:id' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail for duplicates', async () => {
    const v = new Validator(
      {
        features: [{
          id: 1,
          name: 'ok',
        },
        {
          id: 1,
          name: 'ok2',
        }],
      },
      { features: 'array|arrayUniqueObjects:id' }
    );
    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should fail for duplicates', async () => {
    const v = new Validator(
      {
        features: [{
          id: 1,
          name: 'ok',
        },
        {
          id: 1,
          name: 'ok2',
        }],
      },
      { features: 'array|arrayUniqueObjects:id' }
    );
    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('validation should pass for multiple individual duplicates and group uniques', async () => {
    const v = new Validator(
      {
        features: [{
          id: 1,
          name: 'ok',
        },
        {
          id: 1,
          name: 'ok1',
        },
        {
          id: 3,
          name: 'ok2',
        }],
      },
      { features: 'array|arrayUniqueObjects:id,name' }
    );
    const matched = await v.check();

    assert.equal(matched, true);
  });
});
