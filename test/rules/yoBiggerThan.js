const assert = require('assert');
const moment = require('moment');

const Validator = require('../../index');

describe('yoBiggerThan', function () {

    it('should allow ages 1 year bigger than the configured one', async () => {

        const moreThanTenYearsAgo = moment().subtract(11, 'years');

        let v = new Validator({ field: moreThanTenYearsAgo }, { field: 'yoBiggerThan:10' });

        let matched = await v.check();
        assert.equal(matched, true);
    });

    it('should allow the same age than the configured one', async () => {

        const tenYearsAgo = moment().subtract(10, 'years');

        let v = new Validator({ field: tenYearsAgo }, { field: 'yoBiggerThan:10' });

        let matched = await v.check();
        assert.equal(matched, true);
    });

    it('should reject exactly 1 day younger than the configured age', async () => {

        const lessThanTenYearsAgo = moment().subtract(10, 'years').add(1, 'day');

        let v = new Validator({ field: lessThanTenYearsAgo }, { field: 'yoBiggerThan:10' });

        let matched = await v.check();
        assert.equal(matched, false);
    });

    it('should reject not valid date as ages', async () => {

        let v = new Validator({ field: 'not a date' }, { field: 'yoBiggerThan:10' });

        let matched = await v.check();
        assert.equal(matched, false);
    });

});
