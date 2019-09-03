const assert = require('assert');

const moment = require('moment');
const { Validator } = require('../../lib/index');

describe('#dateAfterToday', () => {
  it('should pass with valida date', async () => {
    const v = new Validator(
      {
        dob: moment().add(2, 'days').format('YYYY-MM-DD'),
      }, {
        dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1,days',
      },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should pass with optional seed', async () => {
    const v = new Validator(
      {
        dob: moment().add(2, 'days').format('YYYY-MM-DD'),
      }, {
        dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1',
      },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      {
        dob: '2019-02-28',
      }, {
        dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:2,days',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      {
        dob: '2019-02-28',
      }, {
        dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:2,days',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.dob.message,
      v.getExistinParsedMessage({
        rule: 'dateAfterToday',
        value: '2019-02-28',
        attr: 'dob',
        args: ['2', 'days'],
      }),
    );
  });
});
