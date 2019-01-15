const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('boolean', function () {

    it('validation should pass: with true', async () => {

        const v = new Validator(
            { attribute: true },
            { attribute: 'boolean' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should pass: with 0', async () => {

        const v = new Validator(
            { attribute: 0 },
            { attribute: 'boolean' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should pass: with 0', async () => {

        const v = new Validator(
            { attribute: 1 },
            { attribute: 'boolean' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });


    it('validation should pass: with custom', async () => {

        const v = new Validator(
            { attribute: 'ok' },
            { attribute: 'boolean:ok' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should fail: invalid value', async () => {

        const v = new Validator(
            { attribute: 'not accepted' },
            { attribute: 'boolean' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('boolean', 'attribute'));

    });

   
});
