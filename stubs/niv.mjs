import { Validator, Rules } from '../esm/index.js';

const v = new Validator(
  // {
  //   order: {
  //     items: [
  //       { id: 1, _v: 1 },
  //       { id: 2, _v: 1 },
  //     ]
  //   },
  //   user: 'test',
  //   __v: 1
  // },
  // {
  //   order: 'required|object',
  //   'order.items': 'required|array',
  //   'order.items.*.id': 'required',
  //   'order.items.*.quantity': 'required|integer',
  // },
  // { user: 'test' },
  // { user: 'object', "user.name": [Rules.string(), Rules.alpha()] }
  { user: 'test' },
  {
     user: 'required|object',
     "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);
//v.bailable(false);

v.validate().then((result) => {
  console.log(v.multipleErrors, v.isBailable(), result, v.errors);
  console.log(v.inputsAsPerRules.data)
  console.log(JSON.stringify(v.inputsAsPerRules.data, null, 2));
});