const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Conditions', function () {

    describe('in', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {uuid: '123456'},
                {uuid: 'required|in:123456,000000'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return true', async () => {


            let v = new Validator(r,
                {uuid: '000000'},
                {uuid: 'required|in:123456,000000'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {uuid: '25689'},
                {uuid: 'required|in:123456,000000'});

            let matched = await v.check();

            assert.equal(matched, false);


        });

    });

    describe('same', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {password: '000000', confirm_password: '000000'},
                {password: 'required', confirm_password: 'required|same:password'});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {password: '000000', confirm_password: '123456'},
                {password: 'required', confirm_password: 'required|same:password'});

            let matched = await v.check();

            assert.equal(matched, false);


        });

    });
});