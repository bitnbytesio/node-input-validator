const assert = require('assert');
const { Validator } = require('../../lib/index');

describe('#before', () => {
  it('should pass', async () => {
    const v = new Validator({ dob: '1990-02-28' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1991-01-01' });

    const matched = await v.fails();
    assert.equal(matched, false);
  });

  it('should fail', async () => {
    const v = new Validator({ dob: '1993-28-02' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1992-12-31' });

    const matched = await v.passes();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator({ dob: '1993-02-28' }, { dob: 'required|dateFormat:YYYY-MM-DD|before:1992-12-31' });

    const matched = await v.passes();

    assert.equal(matched, false);
    assert.equal(
      v.errors.dob.message,
      v.getExistinParsedMessage({
        rule: 'dateBefore',
        value: '1992-12-31',
        attr: 'dob',
        args: ['1992-12-31'],
      }),
    );
  });
});
