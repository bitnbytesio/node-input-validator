const assert = require('assert');

const Validator = require('../index');

let r = {};

describe('requiredRules', function () {

    describe('#required', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'Harcharan Singh' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ name: '' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('name');

        });

    });


    describe('#requiredIf', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'Harcharan Singh', sex: 'male', age: 16 }, { sex: 'requiredIf:age,16' });

            let matched = await v.check();

            assert.equal(matched, true);

            v = new Validator({ remember: 'false', age: 16 }, { remember: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator({ remember: false, age: 16 }, { remember: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator({ remember: 0, age: 16 }, { remember: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator({ remember: true, age: 16 }, { remember: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);

            v = new Validator({ age: 16 }, { remember: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, false);

        });

        it('should return false', async () => {

            let v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');

            v = new Validator({ name: 'Harcharan Singh', age: '16' }, { sex: 'requiredIf:age,16' });

            matched = await v.check();

            assert.equal(matched, false);

        });

        it('with multiple fields', async () => {

            let v = new Validator(
                {
                    name: 'Harcharan Singh',
                    age: 16,
                    parent: 'yes',
                    type: 'subscribed',
                    email: 'artisangang@gmail.com'
                },
                {
                    email: 'requiredIf:age,16,parent,yes,type,subscribed'
                }
            );

            let matched = await v.check();

            assert.equal(matched, true);



            v = new Validator(
                {
                    name: 'Harcharan Singh',
                    age: 16,
                    parent: 'yes',
                    type: 'subscribed',
                },
                {
                    email: 'requiredIf:age,16,parent,yes,type,subscribed'
                }
            );

            matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('email');

        });

    });


    describe('#requiredNotIf', function () {

        it('Check for both pass and fail', async () => {

            let v, matched;

            v = new Validator(
                { name: 'Harcharan Singh', age: '16' },
                { sex: 'requiredNotIf:age,16' });

            matched = await v.check();

            assert.equal(matched, true);



            v = new Validator(
                { name: 'Harcharan Singh', age: 15, sex: 'male' },
                { sex: 'requiredNotIf:age,16' });

            matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');


            v = new Validator(
                {
                    name: 'Harcharan Singh',
                    age: 16,
                    parent: 'yes',
                    type: 'subscribed',
                    //email: 'artisangang@gmail.com'
                },
                {
                    email: 'requiredNotIf:age,16,parent,yes,type,subscribed'
                }
            );

            matched = await v.check();


            assert.equal(matched, true);

            v = new Validator(
                {
                    name: 'Harcharan Singh',
                    age: 16,
                    parent: 'yes',
                    type: 'subscribed',
                    email: 'artisangang@gmail.com'
                },
                {
                    email: 'requiredNotIf:age,16,parent,yes,type,subscribed'
                }
            );

            matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('email');

        });

    });


    describe('#requiredWith', function () {

        it('With single and Multiple seeds', async () => {

            let v, matched;

            // validate with single seed
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
                { email: 'email', ip: 'requiredWith:email|ip' });

            matched = await v.check();

            assert.equal(matched, true);

            // validate with multiple seeds
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
                { email: 'requiredWith:name,sex' });

            matched = await v.check();

            assert.equal(matched, false);

            // validate with multiple seeds
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
                { email: 'requiredWith:name,sex' });

            matched = await v.check();

            assert.equal(matched, true);

            // check for fails
            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
                { email: 'email', ip: 'requiredWith:email|ip' });

            matched = await v.check();
            assert.equal(matched, false);
            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('ip');


        });



    });



    describe('#requiredWithout', function () {

        it('With single and multiple seeds', async () => {

            let v, matched;

            v = new Validator(
                { name: 'Harcharan Singh', sex: '', age: '26' },
                { sex: 'requiredWithout:age' }
            );

            matched = await v.check();
            assert.equal(matched, true);


            v = new Validator(
                { name: 'Harcharan Singh', sex: 'male', age: '26' },
                { sex: 'requiredWithout:age' }
            );

            matched = await v.check();
            assert.equal(matched, true);

          
            v = new Validator(
                { name: 'Harcharan Singh' },
                { sex: 'requiredWithout:age' });

            matched = await v.check();
            assert.equal(matched, false);

            should(v.errors).be.an.instanceOf(Object);
            should(v.errors).have.property('sex');

        });

    });

});