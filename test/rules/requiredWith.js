const assert = require('assert');

const Validator = require('../../index');

describe('#requiredWith', function () {

    it('should pass', async () => {

        let v, matched;

        // validate with single seed
        v = new Validator(
            { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
            { email: 'email', ip: 'requiredWith:email|ip' });

        matched = await v.check();

        assert.equal(matched, true);
    });

    it('should fail', async () => {

        // validate with multiple seeds
        const v = new Validator(
            { name: 'Harcharan Singh', sex: 'male', email: '', ip: '' },
            { email: 'requiredWith:name,sex' });

        const matched = await v.check();

        assert.equal(matched, false);
    });


    it('should pass', async () => {
        // validate with multiple seeds
        const v = new Validator(
            { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
            { email: 'requiredWith:name,sex' });

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('should fail', async () => {
        // check for fails
        const v = new Validator(
            { name: 'Harcharan Singh', sex: 'male', email: 'artisangang@gmail.com', ip: '' },
            { email: 'email', ip: 'requiredWith:email|ip' });

        const matched = await v.check();
        assert.equal(matched, false);
        // should(v.errors).be.an.instanceOf(Object);
        // should(v.errors).have.property('ip');

        assert.equal(v.errors.ip.message, v.parseExistingMessageOnly('requiredWith', 'ip', '',4));


    });



});