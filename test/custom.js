const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.extend('even', async function (field, value, message) {

    if ((parseInt(value) % 2) == 0) {
        return true;
    } else {
        this.validator.addError(field, 'even', message || 'The value of the field must be even number');
        return false;
    }

});

Validator.extend('status', async function (field, value, args, message) {

    if (args.indexOf(value) >= 0) {
        return true;
    } else {
        this.validator.addError(field, 'status', message || 'Invalid status');
        return false;
    }

});

let r = {};

describe('Custom Rules', function () {

    describe('Using custom rule even', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {number: '4'}, {number: "even|required"});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {number: '9'}, {number: "even|required"});

            let matched = await v.check();

            assert.equal(matched, false);


        });

    });

    describe('Using custom rule status', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {status: 'draft'}, {status: "status:draft,published|required"});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {status: 'completed'}, {status: "status:draft,published|required"});

            let matched = await v.check();

            assert.equal(matched, false);


        });

    });


    describe('regex', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {number: 'abc'}, {number: "regex:[abc]"});

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {number: 'xyz'}, {number: "regex:[abc]"});

            let matched = await v.check();

            assert.equal(matched, false);


        });
    });

    describe('custom', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {remember: 'yes'}, {remember: 'custom'});

            v.rules.validateCustom = async (field, value, message) => {

                if (value === 'yes' || value === 'on') {
                    return true;
                } else {
                    this.validator.addError(field, 'custom', message || 'The value of the field needs to be  yes or no');
                    return false;
                }

            };

            let matched = await v.check();

            assert.equal(matched, true);


        });

        it('should return false', async () => {


            let v = new Validator(r,
                {remember: '1'}, {remember: 'custom'});

            v.rules.validateCustom = async (field, value, message) => {

                if (value === 'yes' || value === 'on') {
                    return true;
                } else {
                    v.addError(field, 'custom', message || 'The value of the field needs to be  yes or no');
                    return false;
                }

            };

            let matched = await v.check();

            assert.equal(matched, false);


        });


    });
});