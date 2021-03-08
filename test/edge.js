const assert = require('assert');

const { Validator } = require('../lib/index');

describe('Edge Cases', () => {
  describe('undefined', () => {
    it('should ignore undefined and not required fields', async () => {
      const v = new Validator({ field: undefined }, { field: 'string' });

      const matched = await v.check();
      assert.equal(matched, true);
    });

    it('should reject undefined and required fields', async () => {
      const v = new Validator({ field: undefined }, { field: 'required|string' });

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });

  describe('null', () => {
    it('should ignore null and not required fields', async () => {
      const v = new Validator({ field: null }, { field: 'string' });

      const matched = await v.check();
      assert.equal(matched, true);
    });

    it('should reject null and required fields', async () => {
      const v = new Validator({ field: null }, { field: 'required|string' });

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });

  describe('empty string', () => {
    it('should ignore empty string in not required fields', async () => {
      const v = new Validator({ field: '' }, { field: 'string' });

      const matched = await v.check();
      assert.equal(matched, true);
    });

    it('should reject empty string in required fields', async () => {
      const v = new Validator({ field: '' }, { field: 'required|string' });

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });

  describe('exceptions', () => {
    it('Checking for invalid rule', async () => {
      try {
        const v = new Validator({ name: 'Harcharan Singh' }, { name: 'required|fullName' });

        await v.check();

        throw new Error('Rule was missing.');
      } catch (e) {
        assert.equal(e, 'Error: Validation Rule: fullName does not exists.');
      }
    });
  });
});
