const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.messages({
    even: 'The value of the field must be an even number.',
    status: 'Invalid status.'
});

Validator.messages({
    even: 'Even number bharo.',
    status: 'Galat Status.'
}, 'pb');



Validator.customMessages({
    'status.required': 'Status khali nahi hona chahiye.'
}, 'hi');


Validator.extend('even', async function (field, value) {

    if ((parseInt(value) % 2) == 0) {
        return true;
    }

    return false;

});

Validator.extend('status', async function (field, value, args) {

    if (args.indexOf(value) >= 0) {
        return true;
    }

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
            v.errors.number.should.have.property('message', 'The value of the field must be an even number.');

        });

        it('PB: should return false', async () => {

            //Validator.setLang('pb');

            let v = new Validator(
                { number: '9' }, { number: 'even|required' });

                v.setLang('pb');

            let matched = await v.check();

            assert.equal(matched, false);

            //console.log(v.errors);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'Even number bharo.');

            Validator.setLang('en');

        });

        it('should return false', async () => {

            let v = new Validator(
                { number: '9' },
                { number: 'even|required' },
                { 'number.even': 'Invalid number.' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'Invalid number.');

        });

        it('should return false', async () => {

            let v = new Validator(
                { number: '' },
                { number: 'even|required' },
                { 'number.required': 'Number is missing.' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'Number is missing.');

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

            let matched = await v.fails();

            assert.equal(matched, true);

        });

    });



});