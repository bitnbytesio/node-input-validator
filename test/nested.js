const assert = require('assert');

const { Validator } = require('../lib/index');

const input = {
  product: {
    id: '1',
    name: 'empty',
    price: '12.50',
    features: [
      { name: 'Awesome', value: 'awesome' },
      { name: 'Weak', value: 'weak' },
    ],
  },
  cart: [
    {
      id: 1,
      colors: {
        name: 'black',
      },
      features: [11, 12, 13],
      varients: [
        { id: 11 },
        { id: 12 },
        {

          id: 13,
          colors: [
            {
              name: 'Varient Black',
              props: [
                {
                  name: 'p0',
                  tags: ['p01', 12, 13],
                },
              ],
            },
            {
              name: 'Varitnt Blue',
              props: [
                {
                  name: 'p1',
                  tags: [3, 2],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      colors: {
        name: '#fff',
      },
      varients: [
        {
          id: 21,
          colors: [
            {
              name: '#f00', // cart.1.varients.1.colors.name
              props: [
                {
                  name: 'p02',
                  tags: [9, 8, 7],
                },
              ],
            },
            {
              name: '#000000',
            },
            {
              name: 'fail',
              props: [
                {
                  name: 'p12',
                  tags: [7, 8],
                },
              ],
            },
          ],
        },
        { id: 22 },
      ],
    },
  ],
};

describe('Nested', () => {
  describe('Single Level', () => {
    it('should pass with top level required', async () => {
      const v = new Validator(
        {
          features: input.product.features,
        },
        {
          features: 'required|array',
          'features.*.name': 'string',
          'features.*.value': 'string',
        },
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should fail with child level', async () => {
      const v = new Validator(
        {
          features: input.product.features,
        },
        {
          features: 'required|array',
          'features.*.name': 'string',
          'features.*.value': 'integer',
        },
      );

      const matched = await v.check();
      assert.equal(matched, false);
      v.errors.should.have.keys('features.0.value', 'features.1.value');
    });
  });

  describe('Deep Level', () => {
    // it('should pass with top level required', async () => {
    //   const v = new Validator(
    //     input,
    //     {
    //       product: 'required|object',
    //       'product.id': 'required|integer',
    //       'product.name': 'required|string',
    //       'product.price': 'required|numeric',
    //       'cart.*.id': 'required|integer',
    //       'cart.*.features': 'required|array',
    //       'cart.*.features.*': 'required|integer',
    //       'cart.*.colors.name': 'required|string',
    //       'cart.*.varients': 'required|array',
    //       'cart.*.varients.*.id': 'required|integer',
    //       'cart.*.varients.*.colors.*.name': 'required|string',

    //     },
    //   );

    //   const matched = await v.check();

    //   assert.equal(matched, true);
    // });

    it('should fail with child level required', async () => {
      const v = new Validator(
        input,
        {
          product: 'required|object',
          'product.id': 'required|integer',
          'product.name': 'required|string|minLength:10',
          'product.price': 'required|numeric',
          'product.features': 'required|array',
          'product.features.*.name': 'required|string',
          'product.features.*.value': 'required|integer',
          'cart.*.id': 'required|integer',
          'cart.*.colors': 'required|object',
          'cart.*.colors.name': 'required|hexColor',
          'cart.*.varients': 'required|array',
          'cart.*.varients.*.id': 'required|integer',
          'cart.*.varients.*.colors': 'required|array',
          'cart.*.varients.*.colors.*.name': 'required|hexColor',
          'cart.*.varients.*.colors.*.props.*.name': 'required|integer',
        },
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.keys('product.name',
        'product.features.0.value',
        'product.features.1.value');


      v.errors.should.have.keys('cart.0.colors.name',
        'cart.0.varients.2.colors.0.name',
        'cart.0.varients.2.colors.1.name',
        'cart.1.varients.0.colors.2.name',
        'cart.1.varients.0.colors.2.props.0.name');
    });


    it('should fail with deep child level length', async () => {
      const v = new Validator(
        input,
        {
          'cart.*.varients.*.colors.*.props': 'required|array',
          'cart.*.varients.*.colors.*.props.*.tags': 'required|lengthBetween:3,5',

        },
      );

      const matched = await v.check();

      assert.equal(matched, false);


      v.errors.should.have.keys('cart.1.varients.0.colors.2.props.0.tags');
    });
  });
});
