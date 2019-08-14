const assert = require('assert');


const Validator = require('../../index');

describe('requiredRules', () => {
  describe('#required', () => {
    it('should return true', async () => {
      const v = new Validator({ name: 'Harcharan Singh' }, { name: 'required' });

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should return false', async () => {
      const v = new Validator({ name: '' }, { name: 'required' });

      const matched = await v.check();

      assert.equal(matched, false);
    });

    it('should return false', async () => {
      const v = new Validator({ name: '' }, { name: 'required|min:1' });

      const matched = await v.check();

      assert.equal(matched, false);
    });

    it('should return false', async () => {
      const v = new Validator({ email: '' }, { name: 'required|email' });

      const matched = await v.check();

      assert.equal(matched, false);

      assert.equal(v.errors.name.message, v.parseExistingMessageOnly('required', 'name', '', 4));
    });
  });
});
