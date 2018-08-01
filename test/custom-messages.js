const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.setLang('en');

Validator.messages({
    required: 'The :attribute field must not be empty.',
});

Validator.messages({
    required: 'Eh :attribute khali nahi chhadna.',
}, 'pb');

let r = {};

describe('Custom messages', function () {

    describe('Using custom message for required', function () {

        it('should return custom message', async () => {

            let v = new Validator(
                {}, { number: 'required' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'The number field must not be empty.');

        });

        it('should return custom message in another language', async () => {

            let v = new Validator(
                {}, { number: 'required' });

            v.setLang('pb');

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'Eh number khali nahi chhadna.');

        });

        it('should return custom message based on field', async () => {

            let v = new Validator(
                { username: 'test2017' }, { username: 'required|alpha' }, { 'username.alpha': 'Username is invalid.' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('username').and.be.a.Object();
            v.errors.username.should.have.property('message', 'Username is invalid.');

        });

        it('should return custom message based on rule', async () => {

            let v = new Validator(
                { username: 'test2017' }, { username: 'required|alpha' }, { 'username.alpha': 'Username is must.' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('username').and.be.a.Object();
            v.errors.username.should.have.property('message', 'Username is must.');

        });

    });

});