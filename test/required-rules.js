const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('requiredRules', function () {

    describe('required', function () {

        it('should return true', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh'}, {name: 'required'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r, {name: ''}, {name: 'required'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');


        });

    });


    describe('requiredIf', function () {

        it('should return true', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', sex: 'male', age: 16}, {sex: 'requiredIf:age,16'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', age: 16}, {sex: 'requiredIf:age,16'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');


        });

    });


    describe('requiredNotIf', function () {

        it('should return true', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', age: '16'}, {sex: 'requiredNotIf:age,16'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', age: '15'}, {sex: 'requiredNotIf:age,16'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');


        });

    });


    describe('requiredNotIf', function () {

        it('should return true', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', sex: 'male', age: 16}, {sex: 'requiredWith:age'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', age: 15}, {sex: 'requiredWith:age'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');


        });

    });

    describe('requiredWithout', function () {

        it('should return true', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh', sex: 'male'}, {sex: 'requiredWithout:age'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r, {name: 'Harcharan Singh'}, {sex: 'requiredWithout:age'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');


        });

    });


});