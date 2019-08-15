const assert = require('assert');
require('should');

const Validator = require('../index');

Validator.messages({
  even: 'The value of the field must be an even number.',
  status: 'Invalid status.',
});

Validator.messages({
  even: 'Even number bharo.',
  status: 'Galat Status.',
}, 'pb');


Validator.customMessages({
  'status.required': 'Status khali nahi hona chahiye.',
}, 'hi');


Validator.extend('even', async (field, value) => {
  if ((parseInt(value) % 2) === 0) {
    return true;
  }

  return false;
});

Validator.extend('status', async (field, value, args) => {
  if (args.indexOf(value) >= 0) {
    return true;
  }

  return false;
});

Validator.extend('sumOfFields', async function sumOfFields(field, value, args) {
  if (args.length !== 2) {
    throw 'Invalid seed for rule sumOfFields';
  }

  const anotherValue = Number(this.inputs[args[0]]);

  const eq = Number(args[1]);

  if ((Number(value) + anotherValue) !== eq) {
    return false;
  }

  return true;
});


describe('Custom Rules', () => {
  describe('Using custom rule even', () => {
    it('sumOfFields:should return true', async () => {
      const v = new Validator(
        { num1: '50', num2: '50' }, { num1: 'sumOfFields:num2,100|required' }
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('sumOfFields:should return false value is greater', async () => {
      const v = new Validator(
        { num1: '50', num2: '51' }, { num1: 'sumOfFields:num2,100|required' }
      );

      const matched = await v.check();

      assert.equal(matched, false);
    });

    it('sumOfFields:hould return false value is less', async () => {
      const v = new Validator(
        { num1: '50', num2: '49' }, { num1: 'sumOfFields:num2,100|required' }
      );

      const matched = await v.check();

      assert.equal(matched, false);
    });


    it('should return true', async () => {
      const v = new Validator(
        { number: '4' }, { number: 'even|required' }
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should return false', async () => {
      const v = new Validator(
        { number: '9' }, { number: 'even|required' }
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.property('number').and.be.a.Object();
      v.errors.number.should.have.property('message', 'The value of the field must be an even number.');
    });

    it('PB: should return false', async () => {
      // Validator.setLang('pb');

      const v = new Validator(
        { number: '9' }, { number: 'even|required' }
      );

      v.setLang('pb');

      const matched = await v.check();

      assert.equal(matched, false);

      // console.log(v.errors);

      v.errors.should.have.property('number').and.be.a.Object();
      v.errors.number.should.have.property('message', 'Even number bharo.');

      Validator.setLang('en');
    });

    it('should return false', async () => {
      const v = new Validator(
        { number: '9' },
        { number: 'even|required' },
        { 'number.even': 'Invalid number :value.' }
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.property('number').and.be.a.Object();
      v.errors.number.should.have.property('message', 'Invalid number 9.');
    });

    it('should return false', async () => {
      const v = new Validator(
        { number: '' },
        { number: 'even|required' },
        { 'number.required': 'Number is missing.' }
      );

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.property('number').and.be.a.Object();
      v.errors.number.should.have.property('message', 'Number is missing.');
    });
  });

  describe('Using custom rule status', () => {
    it('should return true', async () => {
      const v = new Validator(
        { status: 'draft' }, { status: 'status:draft,published|required' }
      );

      const matched = await v.check();

      assert.equal(matched, true);
    });

    it('should return false', async () => {
      const v = new Validator(
        { status: 'completed' }, { status: 'status:draft,published|required' }
      );

      const matched = await v.fails();

      assert.equal(matched, true);
    });
  });
});

describe('Nice Names', () => {
  describe('Using custom attribute names', () => {
    it('should return true', async () => {
      const v = new Validator(
        { status: 'draft' },
        { status: 'status:pending,published|required' },
        { status: 'The :attribute value is invalid.' }
      );

      v.setAttributeNames({
        status: 'queue status',
      });

      const matched = await v.check();

      assert.equal(matched, false);

      v.errors.should.have.property('status').and.be.a.Object();
      v.errors.status.should.have.property('message', 'The queue status value is invalid.');
    });
  });
});
