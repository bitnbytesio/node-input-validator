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

Validator.extend('sumOfFields', async function (field, value, args) {

    if (args.length !== 2) {
        throw "Invalid seed for rule sumOfFields";
    }

    const anotherValue = Number(this.inputs[args[0]]);

    const eq = Number(args[1]);

    if ((Number(value) + anotherValue) !== eq) {
        return false;
    }

    return true;

});

let r = {};

describe('Custom Rules', function () {

    describe('Using custom rule even', function () {


        it('sumOfFields:should return true', async () => {

            let v = new Validator(
                { num1: '50', num2: '50' }, { num1: 'sumOfFields:num2,100|required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('sumOfFields:should return false value is greater', async () => {

            let v = new Validator(
                { num1: '50', num2: '51' }, { num1: 'sumOfFields:num2,100|required' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('sumOfFields:hould return false value is less', async () => {

            let v = new Validator(
                { num1: '50', num2: '49' }, { num1: 'sumOfFields:num2,100|required' });

            let matched = await v.check();

            assert.equal(matched, false);

        });


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
                { 'number.even': 'Invalid number :value.' });

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'Invalid number 9.');

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

describe('Nice Names', function () {

    describe('Using custom attribute names', function () {

        it('should return true', async () => {

            let v = new Validator(
                { status: 'draft' },
                { status: 'status:pending,published|required' },
                { status: 'The :attribute value is invalid.' }
            );

            v.setAttributeNames({
                status: 'queue status'
            })

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('status').and.be.a.Object();
            v.errors.status.should.have.property('message', 'The queue status value is invalid.');

        });

    });


});