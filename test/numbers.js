const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Numbers', function () {

    describe('integer|max|min|numeric', function () {

        it('should return true', async () => {

            let v = new Validator(r, {price: '19.50', quantity: '5'}, {price: 'required|numeric', quantity: 'required|numeric'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(r, {price: 'null'}, {age: 'required|numeric'});

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('should return true', async () => {

            let v = new Validator(r, {age: '19'}, {age: 'required|integer'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(r, {age: 'adult'}, {age: 'required|integer'});

            let matched = await v.check();

            assert.equal(matched, false);

        });


        it('should return true', async () => {

            let v = new Validator(r, {age: '19'}, {age: 'required|integer|max:21|min:16'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(r, {age: '27'}, {age: 'required|integer|max:21|min:16'});

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('age').and.be.a.Object();
            v.errors.age.should.have.property('message', 'The age can not be greater than 21.');

        });

    });

    describe('digitsBetween', function () {

        it('should return true', async () => {

            let v = new Validator(r, {age: '19'}, {age: 'required|digitsBetween:16,21'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(r, {age: '26'}, {age: 'required|digitsBetween:16,21'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('age');

        });

        it('should return false', async () => {

            let v = new Validator(r, {age: 'adult'}, {age: 'required|digitsBetween:16,21'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('age');

        });

    });

});