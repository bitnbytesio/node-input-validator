const assert = require('assert');

const should = require('should');

const Validator = require('../index');


const v1 = Validator.make({
    name: 'required|maxLength:5',

});

const v2 = Validator.make({
    name: 'required|minLength:5|maxLength:8|alpha',
    password: 'required|maxLength:5',
    age: 'max:23',
    email: 'required|email'
});

describe('Pre Init', function () {

    describe('#1 single field', function () {

        it('should return true', async () => {


            let matched = await v1.apply({
                name: 'Harry'
            });

            assert.equal(matched, true);

        });

        it('should return false', async () => {


            let matched = await v1.apply({
                name: 'Harcharan Singh'
            });

            assert.equal(matched, false);

            should(v1.errors).be.an.instanceOf(Object);
            should(v1.errors).have.property('name');

        });

    });

    describe('#2 multiple fields', function () {


        it('should return true', async () => {

            let matched = await v2.apply({
                name: 'artisan',
                password: '00000',
                age: 20,
                email: 'artisangang@gmail.com'
            });

            assert.equal(matched, true);

        });

        it('should return fails due to age and email', async () => {

            let matched = await v2.apply({
                name: 'artisan',
                password: '00000',
                age: 31,
            });

            assert.equal(matched, false);

            console.log(v2.errors);

            should(v2.errors).be.an.instanceOf(Object);
            
            should(v2.errors).have.property('email');
            should(v2.errors).have.property('age');

        });


    });

});