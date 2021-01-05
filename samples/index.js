const niv = require('../cjs');

setInterval(() => {
  const v = new niv.Validator(
    {
      name: 'Harcharan',
      tags: ['ok', 'abc', 'xyz'],
      numbers: [1, 2, 3, 4],
      arrayUniqueObjects: [
        {
          id: 1,
          name: 'a',
        },
        {
          id: 2,
          name: 'b',
        },
        {
          id: 3,
          name: 'c',
        },
      ],
      betweenInt: 5,
      betweenArray: [1, 2, 3, 4],
      booleanStrict: false,
      booleanStr: 'false',
      booleanInt: 0,
      confirmed: 'password',
      confirmedConfirmation: 'password',
      contains: 'yes it is',
      notContains: 'yes it should',
      creditCard: '4242424242424242',
      dateiso: '2021-01-05T08:11:36+00:00',
      different: 'ok',
      digits: '1234567890',
      digitsBetween: '12345',
      domain: 'bitnbytes.io',
      email: 'email@example.com',
      json: '{"name":"NIV"}',
      base64: 'TklW',
      equals: '18',
      gt: 21,
      gte: 20,
      lt: 19,
      lte: 20,
      age: 30,
      amount: 35.55,
      tandc: "yes",
    },
    {
      name: 'required|string|alpha|ascii',
      tags: 'required|array|length:3,1',
      numbers: 'required|arrayUnique|arrayLength:4',
      'tags.*': 'string',
      arrayUniqueObjects: 'required|arrayUniqueObjects:id',
      'arrayUniqueObjects.*.id': 'required|integer',
      'arrayUniqueObjects.*.name': 'required|string|alpha',
      betweenInt: 'required|between:1,10',
      betweenArray: 'required|between:1,4',
      booleanStrict: 'required|booleanStrict',
      booleanStr: 'required|booleanStr',
      booleanInt: 'required|booleanInt',
      confirmed: 'required|confirmed|alpha',
      contains: 'required|contains:is',
      notContains: 'required|notContains:is',
      creditCard: 'creditCard',
      dateiso: 'dateiso',
      different: 'different:dateiso',
      digits: 'digits:10',
      digitsBetween: 'digitsBetween:5,6',
      domain: 'domain',
      email: 'email',
      json: 'json',
      base64: 'base64',
      equals: 'equals:18',
      gt: 'gt:gte', // 20
      gte: 'gte:lte', // 20
      lt: 'lt:gte', // 20
      lte: 'lte:gte', // 20
      age: 'required|integer|min:25|max:31',
      amount: 'required|numeric',
      tandc: 'accepted',
    },
  );

  v.validate().then((matched) => {
    console.log(matched);
    if (!matched) {
      console.log(v.getErrors());
    }
  })
}, 5000);
