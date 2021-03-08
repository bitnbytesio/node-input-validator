const assert = require('assert');

const { Validator } = require('../lib/index');

describe('Objects', () => {
  describe('Single Level', () => {
    it('should pass with top level required', async () => {
      const v = new Validator(
        {
          product: {
            id: '1', name: 'Product', price: '12.50', active: 'yes',
          },
        },
        {
          product: 'required|object',
          'product.id': 'integer',
          'product.name': 'string',
          'product.price': 'numeric',
          'product.active': 'string',
        },
        {
          product: 'The given product is invalid :value.',
        },
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should fail with child level required', async () => {
      const v = new Validator(
        {
          product: {
            id: 1, name: '', price: '', active: 'yes',
          },
        },
        {
          product: 'required|object',
          'product.id': 'required|integer',
          'product.name': 'required|string',
          'product.price': 'required|numeric',
          'product.active': 'required|string',
        },
        {
          product: 'The given product is invalid :value.',
        },
      );

      const matched = await v.check();

      assert.equal(matched, false);
      v.errors.should.have.keys('product.name', 'product.price');
    });
  });

  describe('Deep Level', () => {
    it('should pass with top level required', async () => {
      const v = new Validator(
        {
          product: {
            id: '1',
            name: 'Product',
            price: '12.50',
            weight: { unit: 'gram', value: 100 },
          },
        },
        {
          product: 'required|object',
          'product.id': 'integer',
          'product.name': 'string',
          'product.price': 'numeric',
          'product.weight': 'object',
          'product.weight.unit': 'in:gram',
          'product.weight.value': 'numeric',
        },
        {
          product: 'The given product is invalid :value.',
        },
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should fail with child level required', async () => {
      const v = new Validator(
        {
          product: {
            id: '1',
            name: '',
            price: '12.50',
            weight: { unit: 'kilo', value: '' },
          },
        },
        {
          product: 'required|object',
          'product.id': 'required|integer',
          'product.name': 'required|string',
          'product.price': 'required|numeric',
          'product.weight': 'required|object',
          'product.weight.unit': 'required|in:gram',
          'product.weight.value': 'required|numeric',
        },
        {
          product: 'The given product is invalid :value.',
        },
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.keys('product.name', 'product.weight.unit', 'product.weight.value');
    });

    it('should fail with child level missing', async () => {
      const v = new Validator(
        {
          product: {
            id: '1',
            name: '',
            price: '12.50',
          },
        },
        {
          product: 'required|object',
          'product.id': 'required|integer',
          'product.name': 'required|string',
          'product.price': 'required|numeric',
          'product.weight': 'required|object',
          'product.weight.unit': 'required|in:gram',
          'product.weight.value': 'required|numeric',
        },
        {
          product: 'The given product is invalid :value.',
        },
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.keys('product.name', 'product.weight', 'product.weight.unit', 'product.weight.value');
    });
  });
});
