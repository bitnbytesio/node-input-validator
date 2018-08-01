const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Numbers', function () {

    describe('integer|max|min|numeric', function () {

        it('should return true', async () => {

            let v = new Validator({ price: '19.50', quantity: '5' }, { price: 'required|numeric', quantity: 'required|numeric' });

            let matched = await v.check();

            assert.equal(matched, true);

        });



        it('should return false', async () => {

            let v = new Validator({ price: 'null' }, { age: 'required|numeric' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('should return true', async () => {

            let v = new Validator({ age: '19' }, { age: 'required|integer' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ age: 'adult' }, { age: 'required|integer' });

            let matched = await v.check();

            assert.equal(matched, false);

        });


        it('should return true', async () => {

            let v = new Validator({ age: '19' }, { age: 'required|integer|max:21|min:16' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ age: '27' }, { age: 'required|integer|max:21|min:16' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('age').and.be.a.Object();
            v.errors.age.should.have.property('message', 'The age can not be greater than 21.');

        });

    });

    describe('#digits,#digitsBetween', function () {

        it('#digits', async () => {

            let v = new Validator({ phone: '8699987073' }, { phone: 'required|digits:10' });

            let matched = await v.check();

            assert.equal(matched, true);


            v = new Validator({ phone: '789456' }, { phone: 'required|digits:10' });

            matched = await v.check();

            assert.equal(matched, false);

        });


        it('should return true', async () => {

            let v = new Validator({ phone: '8699987073' }, { phone: 'required|digitsBetween:10,13' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ phone: '789456' }, { phone: 'required|digitsBetween:10,13' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('phone');

        });

        it('should return false', async () => {

            let v = new Validator({ phone: '869998707378945' }, { phone: 'required|digitsBetween:10,13' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('phone');

        });

    });

});