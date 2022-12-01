import { Validator, Rules } from '../esm/index.js';

const v = new Validator(
  {
    order: {
      items: [
        {},
        {},
      ]
    },
  },
  {
    order: 'required|object',
    'order.items': 'required|array',
    'order.items.*.id': 'required',
    'order.items.*.quantity': 'required|integer',
  },
);

v.validate().then((result) => {
  console.log(result, v.errors);
});