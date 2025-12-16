const assert = require('assert');

const niv = require('../lib/index');

const { Validator } = niv;

describe('Collect Inputs (Beta)', () => {
  // Enable the feature before tests
  before(() => {
    niv.collectInputs(true);
  });

  // Disable after tests to not affect other test files
  after(() => {
    niv.collectInputs(false);
  });

  describe('Feature Toggle', () => {
    it('should return empty object when feature is disabled', async () => {
      niv.collectInputs(false);

      const v = new Validator(
        { name: 'John', age: 25 },
        { name: 'required|string', age: 'required|integer' },
      );

      await v.check();
      const data = v.data();

      assert.deepStrictEqual(data, {});

      // Re-enable for remaining tests
      niv.collectInputs(true);
    });

    it('should return validated fields when feature is enabled', async () => {
      const v = new Validator(
        { name: 'John', age: 25 },
        { name: 'required|string', age: 'required|integer' },
      );

      await v.check();
      const data = v.data();

      assert.deepStrictEqual(data, { name: 'John', age: 25 });
    });
  });

  describe('Basic Usage', () => {
    it('should return only fields with validation rules', async () => {
      const v = new Validator(
        {
          name: 'John',
          email: 'john@example.com',
          extra: 'should be excluded',
          another: 123,
        },
        {
          name: 'required|string',
          email: 'required|email',
        },
      );

      await v.check();
      const data = v.data();

      assert.deepStrictEqual(data, {
        name: 'John',
        email: 'john@example.com',
      });
      assert.strictEqual(data.extra, undefined);
      assert.strictEqual(data.another, undefined);
    });

    it('should work with failed validation', async () => {
      const v = new Validator(
        { name: '', email: 'invalid' },
        { name: 'required|string', email: 'required|email' },
      );

      const matched = await v.check();

      assert.strictEqual(matched, false);
      const data = v.data();
      assert.deepStrictEqual(data, { name: '', email: 'invalid' });
    });
  });

  describe('Nested Objects', () => {
    it('should build correct structure for nested objects', async () => {
      const v = new Validator(
        {
          product: {
            id: 1,
            name: 'Widget',
            price: 99.99,
            internal: 'excluded',
          },
        },
        {
          product: 'required|object',
          'product.id': 'required|integer',
          'product.name': 'required|string',
          'product.price': 'required|numeric',
        },
      );

      await v.check();
      const data = v.data();

      assert.strictEqual(data.product.id, 1);
      assert.strictEqual(data.product.name, 'Widget');
      assert.strictEqual(data.product.price, 99.99);
    });

    it('should build structure without parent object rule', async () => {
      // When not using parent object rule, only explicitly validated fields are included
      const v = new Validator(
        {
          user: {
            name: 'John',
            email: 'john@test.com',
            secret: 'should-not-appear',
          },
        },
        {
          'user.name': 'required|string',
          'user.email': 'required|email',
        },
      );

      await v.check();
      const data = v.data();

      assert.strictEqual(data.user.name, 'John');
      assert.strictEqual(data.user.email, 'john@test.com');
      assert.strictEqual(data.user.secret, undefined);
    });

    it('should handle deep nesting', async () => {
      const v = new Validator(
        {
          order: {
            customer: {
              name: 'John',
              address: {
                city: 'NYC',
                zip: '10001',
              },
            },
          },
        },
        {
          'order.customer.name': 'required|string',
          'order.customer.address.city': 'required|string',
        },
      );

      await v.check();
      const data = v.data();

      assert.strictEqual(data.order.customer.name, 'John');
      assert.strictEqual(data.order.customer.address.city, 'NYC');
      // zip was not in rules, should be excluded
      assert.strictEqual(data.order.customer.address.zip, undefined);
    });
  });

  describe('Arrays with Wildcards', () => {
    it('should handle simple array wildcards', async () => {
      const v = new Validator(
        {
          tags: ['node', 'javascript', 'validation'],
        },
        {
          tags: 'required|array',
          'tags.*': 'required|string',
        },
      );

      await v.check();
      const data = v.data();

      assert.ok(Array.isArray(data.tags));
      assert.strictEqual(data.tags[0], 'node');
      assert.strictEqual(data.tags[1], 'javascript');
      assert.strictEqual(data.tags[2], 'validation');
    });

    it('should handle array of objects with wildcards', async () => {
      const v = new Validator(
        {
          items: [
            { id: 1, quantity: 2, note: 'excluded' },
            { id: 2, quantity: 4, note: 'excluded' },
          ],
        },
        {
          items: 'required|array',
          'items.*.id': 'required|integer',
          'items.*.quantity': 'required|integer',
        },
      );

      await v.check();
      const data = v.data();

      assert.ok(Array.isArray(data.items));
      assert.strictEqual(data.items[0].id, 1);
      assert.strictEqual(data.items[0].quantity, 2);
      assert.strictEqual(data.items[1].id, 2);
      assert.strictEqual(data.items[1].quantity, 4);
    });

    it('should build array structure without parent array rule', async () => {
      // When not using parent array rule, only explicitly validated fields are included
      const v = new Validator(
        {
          items: [
            { id: 1, quantity: 2, note: 'excluded' },
            { id: 2, quantity: 4, note: 'excluded' },
          ],
        },
        {
          'items.*.id': 'required|integer',
          'items.*.quantity': 'required|integer',
        },
      );

      await v.check();
      const data = v.data();

      assert.ok(Array.isArray(data.items));
      assert.strictEqual(data.items[0].id, 1);
      assert.strictEqual(data.items[0].quantity, 2);
      assert.strictEqual(data.items[0].note, undefined);
      assert.strictEqual(data.items[1].id, 2);
      assert.strictEqual(data.items[1].quantity, 4);
      assert.strictEqual(data.items[1].note, undefined);
    });

    it('should handle nested arrays with multiple wildcards', async () => {
      const v = new Validator(
        {
          orders: [
            {
              id: 1,
              items: [
                { sku: 'A1', qty: 2 },
                { sku: 'B2', qty: 3 },
              ],
            },
          ],
        },
        {
          orders: 'required|array',
          'orders.*.id': 'required|integer',
          'orders.*.items': 'required|array',
          'orders.*.items.*.sku': 'required|string',
          'orders.*.items.*.qty': 'required|integer',
        },
      );

      await v.check();
      const data = v.data();

      assert.ok(Array.isArray(data.orders));
      assert.strictEqual(data.orders[0].id, 1);
      assert.ok(Array.isArray(data.orders[0].items));
      assert.strictEqual(data.orders[0].items[0].sku, 'A1');
      assert.strictEqual(data.orders[0].items[0].qty, 2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle array indices greater than 9', async () => {
      const items = [];
      for (let i = 0; i < 12; i++) {
        items.push({ id: i });
      }

      const v = new Validator(
        { items },
        {
          items: 'required|array',
          'items.*.id': 'required|integer',
        },
      );

      await v.check();
      const data = v.data();

      assert.strictEqual(data.items[10].id, 10);
      assert.strictEqual(data.items[11].id, 11);
    });

    it('should handle mixed object and array paths', async () => {
      const v = new Validator(
        {
          store: {
            products: [
              { name: 'Widget', variants: [{ color: 'red' }, { color: 'blue' }] },
            ],
          },
        },
        {
          store: 'required|object',
          'store.products': 'required|array',
          'store.products.*.name': 'required|string',
          'store.products.*.variants': 'required|array',
          'store.products.*.variants.*.color': 'required|string',
        },
      );

      await v.check();
      const data = v.data();

      assert.strictEqual(data.store.products[0].name, 'Widget');
      assert.strictEqual(data.store.products[0].variants[0].color, 'red');
      assert.strictEqual(data.store.products[0].variants[1].color, 'blue');
    });

    it('should create intermediate objects when path does not exist in input', async () => {
      const v = new Validator(
        {},
        {
          'user.name': 'sometimes|string',
        },
      );

      await v.check();
      // Should not crash, data structure should be empty or partial
    });
  });
});
