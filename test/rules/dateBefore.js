const Validator = require('../../index');
const assert = require('assert');

describe('#before', function () {

    it('should return true', async () => {

        let v = new Validator({ dob: '1990-02-28' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1991-01-01' });

        let matched = await v.check();
        assert.equal(matched, true);

    });


    it('should return false', async () => {

        let v = new Validator({ dob: '1993-28-02' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBefore:1992-12-31' });

        let matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.dob.message, v.parseExistingMessageOnly('dateFormat', 'dob', '', 'YYYY-MM-DD'));

    });

});