const assert = require('assert');

const Validator = require('../../index');


describe('ip', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '192.168.1.14' },
      { attribute: 'ip' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: invalida value', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'ip' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    // console.log(v.errors);
    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('ip', 'attribute', ''));
  });
});
