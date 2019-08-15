const assert = require('assert');

const Validator = require('../../index');

describe('notContains', () => {
  it('validation should pass', async () => {
    const v = new Validator(
      { attribute: 'This library is awesome.' },
      { attribute: 'notContains:package' }
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });


  it('validation should fail: mising attribute', async () => {
    const v = new Validator(
      { attribute: 'Yes, Node is awesome' },
      { attribute: 'notContains:Yes' }
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('notContains', 'attribute', '', 'Yes'));
  });
});
