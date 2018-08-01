const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Post', function () {

    describe('any', function () {

        it('should return true when at least one field exists', async () => {

            let v = new Validator({ field1: '1' }, { '*': 'any:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false when there is no fields', async () => {

            let v = new Validator({}, { '*': 'any:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });

    describe('all', function () {

        it('should return true when all fields exists', async () => {

            let v = new Validator({ field1: '1', field2: '2', field3: '3' }, { '*': 'all:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false when there is one field missing', async () => {

            let v = new Validator({ field1: '1', field2: '2' }, { '*': 'all:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });

    describe('function', function () {

        it('should use custom function', async () => {

            let v = new Validator({ username: 'arnold', password: 'arnold123' }, {});

            v.addPostRule(async function (input) {

                if (input.password.indexOf(input.username) >= 0) {
                    this.validator.addError('password', 'custom', 'Password cannot contain username');
                }
            });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });

});