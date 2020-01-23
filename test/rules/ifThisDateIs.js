const assert = require('assert');

const Validator = require('../../index');

describe('ifThisDateIs', function () {

    it('should return true if for a = operator the date is the same', async () => {

        const v = new Validator({ oneDate: '2020-01-11', sameDate: '2020-01-11' }, { oneDate: 'ifThisDateIs:=,sameDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a = operator the date is older', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-10' }, { oneDate: 'ifThisDateIs:=,olderDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a = operator the date is newer', async () => {

        const v = new Validator({ oneDate: '2020-01-11', newerDate: '2020-01-12' }, { oneDate: 'ifThisDateIs:=,newerDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a > operator the date is older', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-10' }, { oneDate: 'ifThisDateIs:>,olderDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a > operator the date is the same', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-11' }, { oneDate: 'ifThisDateIs:>,olderDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a > operator the date is the newer', async () => {

        const v = new Validator({ oneDate: '2020-01-11', newerDate: '2020-01-12' }, { oneDate: 'ifThisDateIs:>,newerDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a < operator the date is the newer', async () => {

        const v = new Validator({ oneDate: '2020-01-11', newerDate: '2020-01-12' }, { oneDate: 'ifThisDateIs:<,newerDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a < operator the date is the same', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-11' }, { oneDate: 'ifThisDateIs:<,olderDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a < operator the date is older', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-10' }, { oneDate: 'ifThisDateIs:<,olderDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a >= operator the date is older', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-10' }, { oneDate: 'ifThisDateIs:>=,olderDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a >= operator the date is the same', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-11' }, { oneDate: 'ifThisDateIs:>=,olderDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a >= operator the date is the newer', async () => {

        const v = new Validator({ oneDate: '2020-01-11', newerDate: '2020-01-12' }, { oneDate: 'ifThisDateIs:>=,newerDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a <= operator the date is newer', async () => {

        const v = new Validator({ oneDate: '2020-01-11', newerDate: '2020-01-12' }, { oneDate: 'ifThisDateIs:<=,newerDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a <= operator the date is the same', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-11' }, { oneDate: 'ifThisDateIs:<=,olderDate' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a <= operator the date is the older', async () => {

        const v = new Validator({ oneDate: '2020-01-11', olderDate: '2020-01-10' }, { oneDate: 'ifThisDateIs:<=,olderDate' });

        const matched = await v.check();

        assert.equal(matched, false);

    });
});
