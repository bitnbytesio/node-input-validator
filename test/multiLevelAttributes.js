const assert = require('assert');

const Validator = require('../index');

describe('Array Fields', () => {
  it('should pass', async () => {
    const v = new Validator(
      {
        plan: [
          { price: '25', title: 'OK' },
          { price: '30' },
        ],
      },
      {
        'plan.*.price': 'required|integer',
      }
    );

    const matched = await v.check();


    assert.equal(matched, true);
  });

  it('rule accepting another fileds as seed', async () => {
    const v = new Validator(
      {
        range: { min: 2, max: 5 },
      },
      {
        'range.min': 'required|integer',
        'range.max': 'required|integer|gt:range.min',
      }
    );

    const matched = await v.check();


    assert.equal(matched, true);
  });

  it('should pass', async () => {
    const v = new Validator(
      {
        plan: [15, 30, 40],
      },
      {
        'plan.*': 'required|integer',
      }
    );

    const matched = await v.check();


    assert.equal(matched, true);
  });

  it('should fail of rule integer', async () => {
    const v = new Validator(
      {
        plan: ['ghj', 'ji', 'lp'],
      },
      {
        'plan.*': 'required|integer',
      }
    );

    const matched = await v.check();


    assert.equal(matched, false);
  });


  it('should fail of index 1 price|title and index 3 price required', async () => {
    const v = new Validator(
      {
        plan: [
          { price: '25', title: 'OK' },
          { price: '', title: '' },
          { price: '30' },
          { price: '', title: 'Title' },
        ],
      },
      {
        'plan.*.price': 'required|integer',
        'plan.*.title': 'required',
      }
    );

    const matched = await v.check();

    v.errors.should.have.keys('plan.1.price', 'plan.1.title', 'plan.2.title', 'plan.3.price');

    assert.equal(matched, false);
  });
});
