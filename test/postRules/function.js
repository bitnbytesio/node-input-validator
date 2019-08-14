const assert = require('assert');

const Validator = require('../../index');

describe('function', () => {
  it('should use custom function', async () => {
    let v = new Validator({ username: 'arnold', password: 'arnold123' }, {});

    v.addPostRule(async function passwordRule(input) {
      if (input.password.indexOf(input.username) >= 0) {
        this.addError('password', 'custom', 'Password cannot contain username');
      }
    });

    let matched = await v.check();

    assert.equal(matched, false);

    v = new Validator({ username: 'arnold', password: '123456' }, {});

    v.addPostRule(async function anotherPasswordRule(input) {
      if (input.password.indexOf(input.username) >= 0) {
        this.addError('password', 'custom', 'Password cannot contain username');
      }
    });

    matched = await v.check();

    assert.equal(matched, true);
  });
});
