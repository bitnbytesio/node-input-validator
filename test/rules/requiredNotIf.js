const assert = require('assert');


const { Validator } = require('../../lib/index');

describe('requiredNotIf', () => {
  it('should pass', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', age: '16' },
      { sex: 'requiredNotIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', age: 15, sex: 'male' },
      { sex: 'requiredNotIf:age,16' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });


  it('should pass with multiple seeds', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        // email: 'artisangang@gmail.com'
      },
      {
        email: 'requiredNotIf:age,16,parent,yes,type,subscribed',
      },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should fail with multiple seeds', async () => {
    const v = new Validator(
      {
        name: 'Harcharan Singh',
        age: 16,
        parent: 'yes',
        type: 'subscribed',
        email: 'artisangang@gmail.com',
      },
      {
        email: 'requiredNotIf:age,16,parent,yes,type,subscribed',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      { name: 'Harcharan Singh', age: 15, sex: 'male' },
      { sex: 'requiredNotIf:age,16' },
    );

    const matched = await v.check();
    assert.equal(matched, false);

    assert.equal(
      v.errors.sex.message,
      v.getExistinParsedMessage({
        rule: 'requiredNotIf',
        value: '',
        attr: 'sex',
        args: ['age', 16],
      }),
    );
  });
});
