const assert = require('assert');

const Validator = require('../../index');


describe('boolean', () => {
  it('validation should pass: with true', async () => {
    const v = new Validator(
      { attribute: true },
      { attribute: 'boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with false as boolean', async () => {
    const v = new Validator(
      { attribute: false },
      { attribute: 'required|boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should pass with nested: with false as boolean', async () => {
    const v = new Validator(
      {
        name: 'test',
        attribute: [
          {
            captain: false,
            email: 'user@yopmail.com',
          },
        ],
      },
      {
        name: 'required|string',
        attribute: 'required|arrayUniqueObjects:email',
        'attribute.*.captain': 'required|boolean',
      }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with 0 as integer', async () => {
    const v = new Validator(
      { attribute: 0 },
      { attribute: 'boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with 0', async () => {
    const v = new Validator(
      { attribute: 0 },
      { attribute: 'boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass: with 0', async () => {
    const v = new Validator(
      { attribute: 1 },
      { attribute: 'boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should pass: with custom', async () => {
    const v = new Validator(
      { attribute: 'ok' },
      { attribute: 'boolean:ok' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid value', async () => {
    const v = new Validator(
      { attribute: 'not accepted' },
      { attribute: 'boolean' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('boolean', 'attribute'));
  });
});
