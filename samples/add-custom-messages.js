const niv = require('../cjs');

niv.extend('even', () => {
  return {
    name: 'even',
    handler: (v) => v % 2,
  }
});

niv.Messages.extend({
  even: 'The :attr value must be an even number.',
  required: 'The attribute is required.',
})

niv.Messages.addNiceNames({
  even: 'Evn',
});

// in order of acceptance

niv.Messages.addCustomMessages({
  'name.required': 'The name is required.',
});

niv.Messages.addCustomMessages({
  name: 'The name is malformed.',
});

niv.lang('pb');

niv.Messages.addCustomMessages({
  name: 'nam sahi nahi hai.',
}, 'pb');

const v = new niv.Validator(
  {
    name: 123,
    even: '4',
  },
  {
    name: 'required|string',
    even: 'even',
  },
);

v.niceNames({
  even: 'EVEN',
});

v.validate().then((matched) => {
  console.log(matched);
  if (!matched) {
    console.log(v.getErrors());
  }
})
