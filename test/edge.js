const assert = require('assert');

const Validator = require('../index');

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

    it('should pass with array as root level', async () => {
      const v = new Validator([
        { field: 'admin@example.com' }],
        { '*.field': 'required|email' });

      const matched = await v.check();
      assert.equal(matched, true);
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

  describe('top level array', () => {
    it('should pass with array as root level', async () => {
      const v = new Validator([
        { field: 'admin@example.com' }],
        { '*.field': 'required|email' });

      const matched = await v.check();
      assert.equal(matched, true);
    });

    it('should fail with array as root level', async () => {
      const v = new Validator([
        { field: 'string' }],
        { '*.field': 'required|email' });

      const matched = await v.check();
      assert.equal(matched, false);
      v.errors.should.have.key('0.field');
    });

    it('should pass with array as root level contains nested object', async () => {
      const v = new Validator([
        { field: { email: 'admin@example.com' } }],
        { '*.field.email': 'required|email' });

      const matched = await v.check();
      assert.equal(matched, true);
    });

    it('should fail with array as root level contains nested object', async () => {
      const v = new Validator([
        { field: { email: 'string' } }],
        { '*.field.email': 'required|email' });
      const matched = await v.check();
      assert.equal(matched, false);
      v.errors.should.have.key('0.field.email');
    });
  });
});
