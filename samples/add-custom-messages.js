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
    // name: 'Harcharan',
    // tags: ['ok', 'abc', 'xyz'],
    // numbers: [1, 2, 3, 4],
    // arrayUniqueObjects: [
    //   {
    //     id: 1,
    //     name: 'a',
    //   },
    //   {
    //     id: 2,
    //     name: 'b',
    //   },
    //   {
    //     id: 3,
    //     name: 'c',
    //   },
    // ],
    // betweenInt: 5,
    // betweenArray: [1, 2, 3, 4],
    // booleanStrict: false,
    // booleanStr: 'false',
    // booleanInt: 0,
    // confirmed: 'password',
    // confirmedConfirmation: 'password',
    // contains: 'yes it is',
    // notContains: 'yes it should',
    // creditCard: '4242424242424242',
    // dateiso: '2021-01-05T08:11:36+00:00',
  },
  {
    name: 'required|string',
    even: 'even',
    // name: ['required', 'string', 'alpha', 'ascii'],
    // tags: 'required|array|length:3,1',
    // numbers: 'required|arrayUnique|arrayLength:4',
    // 'tags.*': 'string',
    // arrayUniqueObjects: 'required|arrayUniqueObjects:id',
    // 'arrayUniqueObjects.*.id': 'required|integer',
    // 'arrayUniqueObjects.*.name': 'required|string|alpha',
    // betweenInt: 'required|between:1,10',
    // betweenArray: 'required|between:1,4',
    // booleanStrict: 'required|booleanStrict',
    // booleanStr: 'required|booleanStr',
    // booleanInt: 'required|booleanInt',
    // confirmed: 'required|confirmed|alpha',
    // contains: 'required|contains:is',
    // notContains: 'required|notContains:is',
    // creditCard: 'creditCard',
    // dateiso: 'dateiso',
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
