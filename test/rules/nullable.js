const assert = require('assert');

const Validator = require('../../index');


describe('nullable', function () {


    it('should fail', async () => {

        const v = new Validator(
            { attribute: "email" },
            { attribute: 'nullable|email' });

        const matched = await v.check();

        assert.equal(matched, false);

        //assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('nullable', 'attribute', '',4));

    });

    it('attribute absent, should fail', async () => {

        let v, matched;

        v = new Validator(
            { },
            { attribute: 'nullable|email' });

        matched = await v.check();

        assert.equal(matched, false);
    });


    it('should pass', async () => {

        let v, matched;

        v = new Validator(
            { attribute: null },
            { attribute: 'nullable|email' });

        matched = await v.check();

        console.log(v.errors);

        assert.equal(matched, true);
    });  


});