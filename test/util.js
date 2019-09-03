const assert = require('assert');
const str = require('../lib/util/str');
const namedArgs = require('../lib/util/namedArgs');
const obj = require('../lib/util/obj');

describe('util:No in use', () => {
  describe('str:trim', () => {
    it('should trim dot', async () => {
      const out = str.trim('.cart.', '.');
      assert.equal(out, 'cart');
    });
  });
});

describe('util:in use', () => {
  describe('namedArgs', () => {
    it('should return empty object', async () => {
      const out = namedArgs(null);
      assert.equal(JSON.stringify(out), JSON.stringify({}));
    });
  });
  describe('obj:strNotations', () => {
    it('should return keys array', async () => {
      const out = obj.strNotations({
        cart: [
          {
            products: [
              {
                'p.ids': [1, 2, 3],
              },
            ],
          },
        ],
      }, { repetition: 10, values: false });

      if (!Array.isArray(out)) {
        throw new Error('Array was expected.');
      }
    });

    it('should use custom escaper', async () => {
      const out = obj.strNotations(
        {
          cart: [
            {
              'products.ids': [1, 2, 3],
            },
          ],
        },
        {
          repetition: 10,
          values: false,
          escape: (key, options) => key.split(options.seperator).join(`\\.${options.seperator}`),
        },
      );

      if (!Array.isArray(out)) {
        throw new Error('Array was expected.');
      }
    });

    it('should throw max rep exception', async () => {
      try {
        const out = obj.strNotations({
          cart: [
            {
              products: [
                {
                  'p.ids': [1, 2, 3],
                },
              ],
            },
          ],
        }, { repetition: 2, values: false });
        if (!Array.isArray(out)) {
          throw new Error('Array was expected.');
        }
      } catch (e) {
        assert.equal(e, 'Error: Max(2) repetation was reached.');
      }
    });
  });
});
