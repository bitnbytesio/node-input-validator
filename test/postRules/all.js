const assert = require('assert');

const Validator = require('../../index');

const r = {};


describe('all', function() {
  it('should return true when all fields exists', async () => {
    const v = new Validator({field1: '1', field2: '2', field3: '3'}, {'*': 'all:field1,field2,field3'});

    const matched = await v.check();

    assert.equal(matched, true);
  });

  it('should return false when there is one field missing', async () => {
    const v = new Validator({field1: '1', field2: '2'}, {'*': 'all:field1,field2,field3'});

    const matched = await v.check();

    assert.equal(matched, false);
  });
});
