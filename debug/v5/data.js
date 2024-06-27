const niv = require('../../cjs');

const inputs = {
  name: 'user name',
  roles: ['user', 'dev'],
  product: { name: 'a prod' },
};
const rules = {
  name: 'string',
  roles: 'array',
  'roles.*': 'string',
  product: 'object',
  'product.name': 'string',
};

const validator = new niv.Validator(inputs, rules);

async function test() {
  const passed = await validator.validate();
  console.log({ passed });

  console.log(validator.data());
}

test();