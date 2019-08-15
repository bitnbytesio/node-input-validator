const assert = require('assert');

const moment = require('moment');
const Validator = require('../../index');


describe('#dateBeforeToday', () => {
  it('should return true', async () => {
    const v = new Validator({
      dob: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    }, {
      dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:1',
    });

    const matched = await v.check();
    assert.equal(matched, true);
  });


  it('should return false', async () => {
    const v = new Validator({
      dob: moment().format('YYYY-MM-DD'),
    }, {
      dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:2,days',
    });

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.dob.message,
      v.parseExistingMessageOnly('dateBeforeToday', 'dob', moment().format('YYYY-MM-DD'), ['2', 'days'])
    );
  });
});
