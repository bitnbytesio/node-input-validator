const assert = require('assert');

const Validator = require('../../index');


describe('digits', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '1250' },
      { attribute: 'digits:4' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should fail: invalid val', async () => {
    const v = new Validator(
      { attribute: 'abcd' },
      { attribute: 'digits:4' }
    );

    const matched = await v.check();


    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('digits', 'attribute', '', '4'));
  });

  it('validation should fail: invalid length', async () => {
    const v = new Validator(
      { attribute: '123456' },
      { attribute: 'digits:8' }
    );

    const matched = await v.check();


    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('digits', 'attribute', '', '8'));
  });

  it('validation should fail: not digits', async () => {
    const v = new Validator(
      { attribute: '1234-567' },
      { attribute: 'digits:8' }
    );

    const matched = await v.check();


    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('digits', 'attribute', '', '8'));
  });


  it('validation should fail: due to .', async () => {
    const v = new Validator(
      { attribute: '120.50' },
      { attribute: 'digits:5' }
    );

    const matched = await v.check();


    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('digits', 'attribute', '', '5'));
  });
});
