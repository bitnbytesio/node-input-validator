const assert = require('assert');

const Validator = require('../index');


describe('Objects', () => {
  it('Validate object properties', async () => {
    const v = new Validator(
      {
        product: {
          id: '1', name: '', price: '', active: 'yes',
        },
      },
      {
        product: 'required|object',
        'product.id': 'required|integer',
        'product.name': 'required',
        'product.price': 'required|integer',
        'product.active': 'required|integer',
      },
      {
        product: 'The given product is invalid :value.',
      }
    );

    const matched = await v.check();

    v.errors.should.have.keys('product.name', 'product.price', 'product.active');

    assert.equal(matched, false);
  });

  it('Validate object:false case', async () => {
    const v = new Validator(
      {
        product: '',
      },
      {
        product: 'required|object',

      }
    );

    const matched = await v.check();

    v.errors.should.have.keys('product');

    assert.equal(matched, false);
  });

  it('Validate object:true case', async () => {
    const v = new Validator(
      {
        product: {},
      },
      {
        product: 'required|object',

      }
    );

    const matched = await v.check();


    assert.equal(matched, true);
  });
});
