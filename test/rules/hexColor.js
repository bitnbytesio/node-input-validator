const assert = require('assert');

const Validator = require('../../index');


describe('hexColor', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '#FFFFFF' },
      { attribute: 'hexColor' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: '#000' },
      { attribute: 'hexColor' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'f00' },
      { attribute: 'hexColor' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'hexColor' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('hexColor', 'attribute', ''));
  });
});
