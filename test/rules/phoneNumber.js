const assert = require('assert');

const Validator = require('../../index');


describe('phoneNumber', () => {
  it('validation should pass', async () => {
    const v = new Validator({ id: '+918699987073' }, { id: 'phoneNumber' });

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should pass', async () => {
    const v = new Validator({ id: '+1-541-754-3010' }, { id: 'phoneNumber' });
    const matched = await v.check();

    assert.equal(matched, true);

    // console.log(v.errors);
  });


  it('validation should fail: with invalid value', async () => {
    const v = new Validator({ attribute: 'artisangang' }, { attribute: 'phoneNumber' });

    const matched = await v.check();

    assert.equal(matched, false);


    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('phoneNumber', 'attribute', '', 4));
  });
});
