const assert = require('assert');

const Validator = require('../../index');

describe('percentageIfThisNumberIs', function () {

    it('should return true if for a = operator and a 200% the related property is 200% of the main one', async () => {

        const v = new Validator({ doubleOfNumber: 2, number: 1 }, { doubleOfNumber: 'percentageIfThisNumberIs:=,200%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a = operator and a 100% the related property is the same of the main one', async () => {

        const v = new Validator({ number: 5, sameNumber: 5 }, { number: 'percentageIfThisNumberIs:=,100%,sameNumber' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a = operator and a 50% the related property is the half of the main one', async () => {

        const v = new Validator({ doubleOfNumber: 2, number: 1 }, { number: 'percentageIfThisNumberIs:=,50%,doubleOfNumber' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a = operator and a 1500% the related property is 200% of the main one', async () => {

        const v = new Validator({ doubleOfNumber: 2, number: 1 }, { doubleOfNumber: 'percentageIfThisNumberIs:=,150%,number' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a = operator and a 120% the related property is the same of the main one', async () => {

        const v = new Validator({ number: 5, sameNumber: 5 }, { number: 'percentageIfThisNumberIs:=,120%,sameNumber' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a = operator and a 40% the related property is the half of the main one', async () => {

        const v = new Validator({ doubleOfNumber: 2, number: 1 }, { number: 'percentageIfThisNumberIs:=,40%,doubleOfNumber' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a > operator and a 200% the related property is bigger than 200% of the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 3, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:>,200%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a > operator and a 100% the related property is bigger than the main one', async () => {

        const v = new Validator({ number: 5, biggerNumber: 6 }, { biggerNumber: 'percentageIfThisNumberIs:>,100%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a > operator and a 300% the related property is 300% bigger than the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 3, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:>,300%,number' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a > operator and a 140% the related property is smaller than 140% of the main one', async () => {

        const v = new Validator({ number: 5, biggerNumber: 6 }, { biggerNumber: 'percentageIfThisNumberIs:>,140%,number' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a < operator and a 200% the related property is smaller than 200% of the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 1.5, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:<,200%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a < operator and a 100% the related property is smaller than the main one', async () => {

        const v = new Validator({ number: 5, smallerNumber: 4 }, { smallerNumber: 'percentageIfThisNumberIs:<,100%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false if for a < operator and a 300% the related property is 300% smaller than the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 3, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:<,300%,number' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false if for a < operator and a 105% the related property is smaller than 105% of the main one', async () => {

        const v = new Validator({ number: 5, smallerNumber: 6 }, { smallerNumber: 'percentageIfThisNumberIs:<,105%,number' });

        const matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return true if for a <= operator and a 200% the related property is smaller than 200% of the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 1.5, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:<=,200%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a <= operator and a 100% the related property is smaller than the main one', async () => {

        const v = new Validator({ number: 5, smallerNumber: 5 }, { smallerNumber: 'percentageIfThisNumberIs:<=,100%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a >= operator and a 200% the related property is bigger than 200% of the main one', async () => {

        const v = new Validator({ moreThanTheDoubleOfNumber: 3, number: 1 }, { moreThanTheDoubleOfNumber: 'percentageIfThisNumberIs:>=,200%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true if for a >= operator and a 100% the related property is bigger than the main one', async () => {

        const v = new Validator({ number: 6, biggerNumber: 6 }, { biggerNumber: 'percentageIfThisNumberIs:>=,100%,number' });

        const matched = await v.check();

        assert.equal(matched, true);

    });
});
