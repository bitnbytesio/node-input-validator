const assert = require('assert');

const { Validator } = require('../../lib/index');


describe('arrayUniqueObjects', () => {
  it('should fail with string', async () => {
    const v = new Validator(
      { features: 'test' },
      { features: 'arrayUniqueObjects:id' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should pass with array of objects', async () => {
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
      { features: 'array|arrayUniqueObjects:id' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail for duplicate ids in array of objects', async () => {
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
      { features: 'array|arrayUniqueObjects:id' },
    );
    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('should pass for multiple individual duplicates and unique when grouped', async () => {
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
      { features: 'array|arrayUniqueObjects:id,name' },
    );
    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { features: {} },
      { features: 'arrayUniqueObjects:id' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.features.message,
      v.getExistinParsedMessage({
        rule: 'arrayUniqueObjects',
        value: {},
        attr: 'features',
        args: ['id'],
      }),
    );
  });
});
