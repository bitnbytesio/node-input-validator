const assert = require('assert');
const Validator = require('../../index');

describe('#before', () => {
  it('should return true', async () => {
    const v = new Validator({ dob: '1990-02-28' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1991-01-01' });

    const matched = await v.check();
    assert.equal(matched, true);
  });


  it('should return false', async () => {
    const v = new Validator({ dob: '1993-28-02' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1992-12-31' });

    const matched = await v.check();

    assert.equal(matched, false);

    assert.equal(v.errors.dob.message, v.parseExistingMessageOnly('dateFormat', 'dob', '', 'YYYY-MM-DD'));
  });
});
