const assert = require('assert');

const moment = require('moment');
const { Validator } = require('../../lib/index');


describe('#dateBeforeToday', () => {
  it('should pass', async () => {
    const v = new Validator(
      {
        dob: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      },
      {
        dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:1',
      },
    );

    const matched = await v.passes();
    assert.equal(matched, true);
  });


  it('should fail', async () => {
    const v = new Validator(
      {
        dob: moment().format('YYYY-MM-DD'),
      },
      {
        dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:2,days',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator(
      {
        dob: moment().format('YYYY-MM-DD'),
      },
      {
        dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:2,days',
      },
    );

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.dob.message,
      v.getExistinParsedMessage({
        rule: 'dateBeforeToday',
        value: moment().format('YYYY-MM-DD'),
        attr: 'dob',
        args: ['2', 'days'],
      }),
    );
  });
});
