const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('requiredRules', function () {

    describe('#required', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'Harcharan Singh' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ name: '' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

    });


    describe('#requiredIf', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'Harcharan Singh', sex: 'male', age: 16 }, { sex: 'requiredIf:age,16' });

            let matched = await v.check();

            assert.equal(matched, true);

            //v = new Validator( {name: 'Harcharan Singh', sex: 'male', age: 16}, {sex: 'requiredIf'});

            //matched = await v.check();

            //assert.throws( async () => { await v.check() }, Error);

        });

        it('should return false', async () => {

            let v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');

            v = new Validator({ name: 'Harcharan Singh', sex: 16 }, { sex: 'requiredIf:sex,16' });

            matched = await v.check();

            assert.equal(matched, false);

        });

    });


    describe('#requiredNotIf', function () {

        it('Check for both pass and fail', async () => {

            let v, matched;

            v = new Validator(
                { name: 'Harcharan Singh', age: '16' },
                { sex: 'requiredNotIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);



            v = new Validator(
                { name: 'Harcharan Singh', age: '15' },
                { sex: 'requiredNotIf:age,16' });

            matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');

        });

    });


    describe('#requiredWith', function () {

        it('With single and Multiple seeds', async () => {

            let v, matched;

            // validate with single seed
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
                { email: 'email', ip: 'requiredWith:email|ip' });

            matched = await v.check();

            assert.equal(matched, true);

            // validate with multiple seeds
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
                { email: 'requiredWith:name,sex' });

            matched = await v.check();

            assert.equal(matched, false);

            // validate with multiple seeds
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
                { email: 'requiredWith:name,sex' });

            matched = await v.check();

            assert.equal(matched, true);

            // check for fails
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
                { email: 'email', ip: 'requiredWith:email|ip' });

            matched = await v.check();
            assert.equal(matched, false);
            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('ip');


        });



    });



    describe('#requiredWithout', function () {

        it('With single and multiple seeds', async () => {

            let v, matched;

            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', age: '' },
                { sex: 'requiredWithout:age' });

            matched = await v.check();

            assert.equal(matched, true);


            v = new Validator(
                { name: 'Harcharan Singh', sex: '', age: '' },
                { sex: 'requiredWithout:age,name' });

            matched = await v.check();

            assert.equal(matched, false);


            v = new Validator(
                { name: 'Harcharan Singh' },
                { sex: 'requiredWithout:age' });

            matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');

        });

    });

});