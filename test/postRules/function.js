const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('function', () => {
  it('should use custom function', async () => {
    let v = new Validator({ username: 'arnold', password: 'arnold123' }, {});

    v.addPostRule(async (provider) => {
      if (provider.inputs.password.indexOf(provider.inputs.username) >= 0) {
        provider.error('password', 'custom', 'Password cannot contain username');
      }
    });

    let matched = await v.check();

    assert.equal(matched, false);

    v = new Validator({ username: 'arnold', password: '123456' }, {});

    v.addPostRule(async (provider) => {
      if (provider.inputs.password.indexOf(provider.inputs.username) >= 0) {
        provider.error('password', 'custom', 'Password cannot contain username');
      }
    });

    matched = await v.check();

    assert.equal(matched, true);
  });
});
