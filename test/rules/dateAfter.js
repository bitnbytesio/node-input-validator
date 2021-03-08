const assert = require('assert');
const { Validator } = require('../../lib/index');

describe('#dateAfter', () => {
  it('should pass with validadate format', async () => {
    const v = new Validator(
      { dob: '1990-02-28' },
      { dob: 'required|dateFormat:YYYY-MM-DD|dateAfter:1990-01-01' },
    );

    const matched = await v.check();
    assert.equal(matched, true);
  });

  it('should fail with invalida date format', async () => {
    let v = new Validator({ dob: '1993-28-02' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateAfter:2000-15-31' });

    let matched = await v.check();

    assert.equal(matched, false);

    v = new Validator({ dob: '1993-28-02' }, { dob: 'required|dateFormat:YYYY-MM-DD|after:2000-12-31' });

    matched = await v.check();

    assert.equal(matched, false);
  });

  it('message should exist', async () => {
    const v = new Validator({ dob: '1993-10-15' }, { dob: 'required|dateFormat:YYYY-MM-DD|after:2000-12-31' });

    const matched = await v.check();

    assert.equal(matched, false);
    assert.equal(
      v.errors.dob.message,
      v.getExistinParsedMessage({
        rule: 'after',
        value: '1993-10-15',
        attr: 'dob',
        args: ['2000-12-31'],
      }),
    );
  });
});
