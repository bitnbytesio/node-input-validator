const niv = require('../cjs');

// const v = new niv.Validator(
//   {
//     nullable: null,
//     // sometimes: 'sometimes'
//   },
//   {
//     nullable: [niv.Rules.string(), niv.Rules.email(), niv.Rules.nullable()],
//     sometimes: [niv.Rules.string(), niv.Rules.email(), niv.Rules.sometimes()],
//   },
// );

const v = new niv.Validator(
  {
   
  },
  {
    products: 'object',
    'products.name': 'sometimes|string',
    'products.attributes': 'nullable|array',
  },
);

v.validate().then((matched) => {
  console.log(matched);
  if (!matched) {
    console.log(v.getErrors());
  }
})
