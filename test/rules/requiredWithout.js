const assert = require('assert');

const Validator = require('../../index');


describe('requiredWithout', function () {

    it('should pass', async () => {



        const v = new Validator(
            { name: 'Harcharan Singh', sex: '', age: '26' },
            { sex: 'requiredWithout:age' }
        );

        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('should pass', async () => {
        const v = new Validator(
            { name: 'Harcharan Singh', sex: 'male', age: '26' },
            { sex: 'requiredWithout:age' }
        );

        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('should fails', async () => {

        const v = new Validator(
            { name: 'Harcharan Singh' },
            { sex: 'requiredWithout:age' });

        const matched = await v.check();
        assert.equal(matched, false);

        assert.equal(v.errors.sex.message, v.parseExistingMessageOnly('requiredWithout', 'sex', '',4));

        // should(v.errors).be.an.instanceOf(Object);
        // should(v.errors).have.property('sex');

    });

});