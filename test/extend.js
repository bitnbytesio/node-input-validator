const assert = require('assert');
require('should');

const niv = require('../lib/index');

const { Validator, setLang, niceNames } = niv;

niv.extendMessages({
  even: 'The value of the field must be an even number.',
  status: 'Invalid status.',
});

niv.extendMessages({
  even: 'Even number bharo.',
  status: 'Galat Status.',
}, 'pb');

niv.addCustomMessages({
  'status.required': 'Status khali nahi hona chahiye.',
}, 'hi');

niv.addCustomMessages({
  'status.required': 'Status khali nahi hona chahiye.',
});

niv.extend('even', ({ value }) => {
  if ((parseInt(value) % 2) === 0) {
    return true;
  }

  return false;
});

niv.extend('status', ({ value, args }) => {
  if (args.indexOf(value) >= 0) {
    return true;
  }

  return false;
});

niv.extend('sumOfFields', ({ value, args }, v) => {
  if (args.length !== 2) {
    throw new Error('Invalid seed for rule sumOfFields');
  }

  const anotherValue = Number(v.inputs[args[0]]);

  const eq = Number(args[1]);

  if ((Number(value) + anotherValue) !== eq) {
    return false;
  }

  return true;
});

describe('Custom Rules', () => {
  it('sumOfFields:should pass', async () => {
    const v = new Validator(
      { num1: '50', num2: '50' }, { num1: 'sumOfFields:num2,100|required' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('sumOfFields:should fails, value is greater', async () => {
    const v = new Validator(
      { num1: '50', num2: '51' }, { num1: 'sumOfFields:num2,100|required' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('sumOfFields:should fail, value is less', async () => {
    const v = new Validator(
      { num1: '50', num2: '49' }, { num1: 'sumOfFields:num2,100|required' },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('even:should pass', async () => {
    const v = new Validator(
      { number: '4' }, { number: 'even|required' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('even:should fail', async () => {
    setLang('en');
    const v = new Validator(
      { number: '9' }, { number: 'even|required' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.number.message,
      v.getExistinParsedMessage({
        rule: 'even',
        value: '9',
        attr: 'number',
        args: [],
      }),
    );
  });

  it('even:should fail', async () => {
    setLang('pb');
    const v = new Validator(
      { number: '9' }, { number: 'even|required' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.number.message,
      'Even number bharo.',
    );
    setLang('en');
  });

  it('status:should pass', async () => {
    const v = new Validator(
      { status: 'draft' }, { status: 'status:draft,published|required' },
    );

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('status:should fail', async () => {
    niceNames({
      status: 'STATUS Attribute',
    });
    const v = new Validator(
      { status: 'completed' }, { status: 'status:draft,published|required' },
    );

    const matched = await v.fails();

    assert.equal(matched, true);

    assert.equal(
      v.errors.status.message,
      v.getExistinParsedMessage({
        rule: 'status',
        value: 'completed',
        attr: 'STATUS Attribute',
        args: [],
      }),
    );
  });
  niceNames({
    status: 'status',
  });
});

describe('Custom messages', () => {
  it('should return status.required custom message', async () => {
    const v = new Validator(
      { status: '' },
      { status: 'required' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    v.errors.should.have.property('status').and.be.a.Object();
    v.errors.status.should.have.property('message', 'Status khali nahi hona chahiye.');
  });

  it('should return custom message for required', async () => {
    const v = new Validator(
      { number: '' },
      { number: 'even|required' },
      { 'number.required': 'Number is missing.' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    v.errors.should.have.property('number').and.be.a.Object();
    v.errors.number.should.have.property('message', 'Number is missing.');
  });

  it('should return custom message for even', async () => {
    const v = new Validator(
      { number: '9' },
      { number: 'even|required' },
      { 'number.even': 'Invalid number :value.' },
    );

    const matched = await v.check();

    assert.equal(matched, false);

    v.errors.should.have.property('number').and.be.a.Object();
    v.errors.number.should.have.property('message', 'Invalid number 9.');
  });
});

describe('Nice Names', () => {
  it('should change attribute name in message', async () => {
    const v = new Validator(
      { status: 'draft' },
      { status: 'status:pending,published|required' },
      { status: 'The :attribute value is invalid.' },
    );

    v.niceNames({
      status: 'queue status',
    });

    const matched = await v.check();

    assert.equal(matched, false);

    v.errors.should.have.property('status').and.be.a.Object();
    v.errors.status.should.have.property('message', 'The queue status value is invalid.');
  });
});
