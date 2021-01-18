const niv = require('../cjs');

const faMessage = require('../cjs/messages/fa.messages');

niv.Messages.extend(faMessage.messages, 'fa');

niv.lang('fa');

const v = new niv.Validator(
  {
    name: '',
    email: 'qer',
  },
  {
    name: 'required|string',
    email: 'required|email',
  },
);

v.validate().then((matched) => {
  console.log(matched);
  if (!matched) {
    console.log(v.getErrors());
  }
})
