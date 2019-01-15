const assert = require('assert');


const Validator = require('../../index');

describe('requiredIf', function () {


    it('should return true', async () => {

        const v = new Validator({ name: 'Harcharan Singh', sex: 'male', age: 16 }, { sex: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        const v = new Validator({ remember: 'false', age: 16 }, { remember: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        const v = new Validator({ remember: false, age: 16 }, { remember: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        const v = new Validator({ remember: 0, age: 16 }, { remember: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        const v = new Validator({ remember: true, age: 16 }, { remember: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, true);


    });

    it('should return false', async () => {

        const v = new Validator({ age: 16 }, { remember: 'requiredIf:age,16' });

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.remember.message, v.parseExistingMessageOnly('requiredIf', 'remember', '',['age', '16']));

    });

    it('should return false', async () => {

        let v = new Validator({ name: 'Harcharan Singh', age: 16 }, { sex: 'requiredIf:age,16' });

        let matched = await v.check();

        assert.equal(matched, false);

        // should(v.errors).be.an.instanceOf(Object);
        // should(v.errors).have.property('sex');

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

        // should(v.errors).be.an.instanceOf(Object);
        // should(v.errors).have.property('email');

    });


});