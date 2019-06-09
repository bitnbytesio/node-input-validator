const Validator = require('../../index');
const assert = require('assert');

const moment = require('moment');

//console.log('=================================================================');
//console.log(moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))

describe('#dateBeforeToday', function () {

    it('should return true', async () => {

        let v, matched;

        v = new Validator({ dob: moment().subtract(1, 'days').format('YYYY-MM-DD') }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:1' });

        matched = await v.check();
        assert.equal(matched, true);

    });


    it('should return false', async () => {

        let v = new Validator({ dob: moment().format('YYYY-MM-DD') }, { dob: 'required|dateFormat:YYYY-MM-DD|dateBeforeToday:2,days' });

        let matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.dob.message, v.parseExistingMessageOnly('dateBeforeToday', 'dob', moment().format('YYYY-MM-DD'), ['2', 'days']));

    });

});