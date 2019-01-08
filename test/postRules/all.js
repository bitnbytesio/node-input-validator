const assert = require('assert');

const Validator = require('../../index');

let r = {};


describe('all', function () {

    it('should return true when all fields exists', async () => {

        let v = new Validator({ field1: '1', field2: '2', field3: '3' }, { '*': 'all:field1,field2,field3' });

        let matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false when there is one field missing', async () => {

        let v = new Validator({ field1: '1', field2: '2' }, { '*': 'all:field1,field2,field3' });

        let matched = await v.check();

        assert.equal(matched, false);

    });

});
