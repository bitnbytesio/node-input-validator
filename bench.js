const { Validator } = require('./cjs');

const v = new Validator(
  {
    name: 'Harcharan Singh',
    email: 'bitnbytesio@gmail.com',
    phone: '8699986999',
  },
  {
    name: 'required|string',
    email: 'required|string|email',
    phone: 'required|string|digits:10',
  },
)

v.validate().then(passed => console.log(passed));
