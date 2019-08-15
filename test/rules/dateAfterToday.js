const assert = require('assert');

const moment = require('moment');
const Validator = require('../../index');

describe('#dateAfterToday', () => {
  it('should return true', async () => {
    const v = new Validator({
      dob: moment().add(2, 'days').format('YYYY-MM-DD'),
    }, {
      dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1,days',
    });

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('without second seed', async () => {
    const v = new Validator({
      dob: moment().add(2, 'days').format('YYYY-MM-DD'),
    }, {
      dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1',
    });

    const matched = await v.check();
    assert.equal(matched, true);
  });


  it('should return false', async () => {
    const v = new Validator({
      dob: '2019-02-28',
    }, {
      dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:2,days',
    });

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(
      v.errors.dob.message,
      v.parseExistingMessageOnly('dateAfterToday', 'dob', '2019-02-28', ['2', 'days'])
    );
  });
});
