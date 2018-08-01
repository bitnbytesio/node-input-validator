const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Multiple rules test', function () {

    describe('required|minLength|maxLength|alpha', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'artisan' }, { name: 'required|minLength:5|maxLength:8|alpha' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false due to minLength failed', async () => {

            let v = new Validator({ name: 'art' }, { name: 'required|minLength:5|maxLength:8|alpha' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

        it('should return false due to maxLength failed', async () => {

            let v = new Validator({ name: 'artisangang' }, { name: 'required|minLength:5|maxLength:8' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

    });

});
