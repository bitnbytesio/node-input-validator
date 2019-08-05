const assert = require('assert');

const Validator = require('../index');

const r = {};

describe('Edge Cases', function() {
  describe('undefined', function() {
    it('should ignore undefined and not required fields', async () => {
      const v = new Validator({field: undefined}, {field: 'string'});

      const matched = await v.check();
      assert.equal(matched, true);
    });


    it('should reject undefined and required fields', async () => {
      const v = new Validator({field: undefined}, {field: 'required|string'});

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });

  describe('null', function() {
    it('should ignore null and not required fields', async () => {
      const v = new Validator({field: null}, {field: 'string'});

      const matched = await v.check();
      assert.equal(matched, true);
    });


    it('should reject null and required fields', async () => {
      const v = new Validator({field: null}, {field: 'required|string'});

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });

  describe('empty string', function() {
    it('should ignore empty string in not required fields', async () => {
      const v = new Validator({field: ''}, {field: 'string'});

      const matched = await v.check();
      assert.equal(matched, true);
    });


    it('should reject empty string in required fields', async () => {
      const v = new Validator({field: ''}, {field: 'required|string'});

      const matched = await v.check();
      assert.equal(matched, false);
    });
  });
});
