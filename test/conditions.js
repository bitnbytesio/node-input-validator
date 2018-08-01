const assert = require('assert');

const should = require('should');

const Validator = require('../index');

const mixValidator = require('../lib/rules/mix.js');

let r = {};

describe('Conditions', function () {

    describe('#accepted,#boolean,#lengthBetween', function () {

        it('between return true', async () => {

            let v = new Validator(
                { username: 'harry' },
                { username: 'required|lengthBetween:3,10' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('between return false', async () => {

            let v = new Validator(
                { username: 'harry' },
                { username: 'required|lengthBetween:8,12' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('Both pass and fail', async () => {

            let v, matched;

            // assertion 1
            v = new Validator(
                { tnc: 'yes' },
                { tnc: 'required|accepted' });

            matched = await v.check();

            assert.equal(matched, true);

            // assertion 2
            v = new Validator(
                { tnc: 'true' },
                { tnc: 'required|accepted' });

            matched = await v.check();

            assert.equal(matched, true);


            // assertion 3 
            v = new Validator(
                {},
                { tnc: 'required|accepted' });

            matched = await v.check();

            assert.equal(matched, false);
        });

        it('#boolean', async () => {

            let v, matched;

            // assertion 1
            v = new Validator(
                { tnc: 'true', remember: 'false' },
                { tnc: 'required|boolean', remember: 'required|boolean' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator(
                { tnc: '1', remember: '0' },
                { tnc: 'required|boolean', remember: 'required|boolean' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator(
                { tnc: 'ok', remember: 'false' },
                { tnc: 'required|boolean', remember: 'required|boolean' });

            matched = await v.check();

            assert.equal(matched, false);

        });

    });

    describe('#in', function () {

        it('Both fail and pass', async () => {

            let v, matched;

            v = new Validator(
                { uuid: '123456' },
                { uuid: 'required|in:123456,000000' });

            matched = await v.check();

            assert.equal(matched, true);


            v = new Validator(
                { uuid: '000000' },
                { uuid: 'required|in:123456,000000' });

            matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { uuid: '25689' },
                { uuid: 'required|in:123456,000000' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });

    describe('#same,#equals', function () {

        it('#equals', async () => {

            let v, matched;

            v = new Validator(
                { password: '000000', },
                { password: 'required|equals:000000' }
            );

            matched = await v.check();

            assert.equal(matched, true);


            v = new Validator(
                { password: '000000', },
                { password: 'required|equals:0000000' }
            );

            matched = await v.check();

            assert.equal(matched, false);

        });

        it('#same', async () => {

            let v, matched;

            v = new Validator(
                { password: '000000', confirm_password: '000000' },
                { password: 'required', confirm_password: 'required|same:password' });

            matched = await v.check();

            assert.equal(matched, true);


            v = new Validator(
                { password: '000000', confirm_password: '123456' },
                { password: 'required', confirm_password: 'required|same:password' });

            matched = await v.check();

            assert.equal(matched, false);

        });

    });
});