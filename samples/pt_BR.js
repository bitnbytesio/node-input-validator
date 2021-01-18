const niv = require('../cjs');

const pt_BRMessage = require('../cjs/messages/pt_BR.messages');

niv.Messages.extend(pt_BRMessage.messages, 'pt_BR');

niv.lang('pt_BR');

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
