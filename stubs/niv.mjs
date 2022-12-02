const { Validator } = require('../lib/index.js');

const v = new Validator(
  {
    order: {
      price: 100,
      items: [
        { id: 1, quantity: 2, _v: 2 },
        { id: 2, quantity: 4, _v: 2 },
      ],
      _v: 1,
    },
    extra: 1,
    _v: 1,
  },
  {
    order: 'object',
    'order.price': 'numeric',
    'order.items': 'array',
    'order.items.*.id': 'numeric',
    'order.items.*.quantity': 'numeric',
  },
);

v.validate().then(passed => {
  console.log(passed, v.errors, v.data());
});