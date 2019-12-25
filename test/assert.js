const assert = require('assert');

const niv = require('../lib/index');

describe('Assert Rules', () => {
  it('should pass with valid rule', async () => {
    niv.assert({
      password: 'required|string',
    });
  });

  it('should throw exception for non existing rule', async () => {
    try {
      niv.assert({
        password: 'passIt',
      });

      throw new Error('Invalid seed exception.');
    } catch (e) {
      assert.equal(e, 'Error: Rule passIt used for attribute password is invalid.');
    }
  });
});
