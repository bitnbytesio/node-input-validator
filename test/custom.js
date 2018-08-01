const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.messages({
    even: 'The value of the field must be even number.',
    status: 'Invalid status'
});

Validator.extend('even', async function (field, value) {

    if ((parseInt(value) % 2) == 0) {
        return true;
    }

    this.validator.addError(field, 'even');

    return false;

});

Validator.extend('status', async function (field, value, args) {

    if (args.indexOf(value) >= 0) {
        return true;
    }

    this.validator.addError(field, 'status');

    return false;

});

let r = {};

describe('Custom Rules', function () {

    describe('Using custom rule even', function () {

        it('should return true', async () => {

            let v = new Validator(
                { number: '4' }, { number: 'even|required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { number: '9' }, { number: 'even|required' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'The value of the field must be even number.');

        });

    });

    describe('Using custom rule status', function () {

        it('should return true', async () => {

            let v = new Validator(
                { status: 'draft' }, { status: 'status:draft,published|required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { status: 'completed' }, { status: 'status:draft,published|required' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });


    describe('regex', function () {

        it('should return true', async () => {

            let v = new Validator(
                { number: 'abc' }, { number: 'regex:[abc]' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { number: 'xyz' }, { number: 'regex:[abc]' });

            let matched = await v.check();

            assert.equal(matched, false);

        });
    });

    describe('custom', function () {

        it('should return true', async () => {

            let v = new Validator(
                { remember: 'yes' }, { remember: 'custom' });

            v.rules.validateCustom = async (field, value, message) => {

                if (value === 'yes' || value === 'on') {
                    return true;
                }

                this.validator.addError(field, 'custom');

                return false;

            };

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { remember: '1' }, { remember: 'custom' });

            v.rules.validateCustom = async (field, value) => {

                if (value === 'yes' || value === 'on') {
                    return true;
                }

                v.addError(field, 'custom');

                return false;

            };

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });
});