const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Pattern', function () {

    describe('alpha', function () {

        it('should return true', async () => {

            let v = new Validator( {name: 'Harcharan'}, {name: 'alpha'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator( {name: '123456'}, {name: 'alpha'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

        it('should return false', async () => {

            let v = new Validator( {name: 'ASD123456'}, {name: 'alpha'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

        it('should return false', async () => {

            let v = new Validator( {name: 'ASD-QRT'}, {name: 'alpha'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

    });


    describe('alphaDash', function () {

        it('should return true', async () => {

            let v = new Validator( {name: 'HarcharanSingh'}, {name: 'alphaDash'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true', async () => {

            let v = new Validator( {name: 'Harcharan_Singh'}, {name: 'alphaDash'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true', async () => {

            let v = new Validator( {name: 'Harcharan-Singh'}, {name: 'alphaDash'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator( {name: 'Harcharan Singh'}, {name: 'alphaDash'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

    });


    describe('alphaNumeric', function () {

        it('should return true', async () => {

            let v = new Validator( {uuid: 'QWERTY'}, {uuid: 'alphaNumeric'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true', async () => {

            let v = new Validator( {uuid: '123456'}, {uuid: 'alphaNumeric'});

            let matched = await v.check();

            assert.equal(matched, true);

        });


        it('should return true', async () => {

            let v = new Validator( {uuid: 'QWERTY123'}, {uuid: 'alphaNumeric'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator( {uuid: 'QWERTY-13'}, {uuid: 'alphaNumeric'});

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('uuid');

        });

    });

    describe('email', function () {

        it('should return true', async () => {

            let v = new Validator( {email: 'artisangang@gmail.com'}, {email: 'required|email'});

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator( {email: 'artisangang.gmail.com'}, {email: 'required|email'});

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });

});