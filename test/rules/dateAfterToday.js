const Validator = require('../../index');
const assert = require('assert');

const moment = require('moment');

describe('#dateAfterToday', function () {

    it('should return true', async () => {

        let v, matched;

        v = new Validator({ dob: moment().add(2, 'days').format('YYYY-MM-DD') }, { dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1,days' });

        matched = await v.check();
        assert.equal(matched, true);

    });

    it('without second seed', async () => {

        let v, matched;

        v = new Validator({ dob: moment().add(2, 'days').format('YYYY-MM-DD') }, { dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:1' });

        matched = await v.check();
        assert.equal(matched, true);

    });


    it('should return false', async () => {

        let v = new Validator({ dob: '2019-02-28' }, { dob: 'required|dateFormat:YYYY-MM-DD|dateAfterToday:2,days' });

        let matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.dob.message, v.parseExistingMessageOnly('dateAfterToday', 'dob', '2019-02-28', ['2', 'days']));

    });

});