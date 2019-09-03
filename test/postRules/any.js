/* eslint-disable no-undef */
const assert = require('assert');

const { Validator } = require('../../lib/index');

describe('Post', () => {
  describe('any', () => {
    it('should return true when at least one field exists', async () => {
      const v = new Validator({ field1: '1' }, { '*': 'any:field1,field2,field3' });

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should return false when there is no fields', async () => {
      const v = new Validator({}, { '*': 'any:field1,field2,field3' });

      const matched = await v.check();

      assert.equal(matched, false);
    });
  });
});
