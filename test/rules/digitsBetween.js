const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('digitsBetween', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { attribute: '1250' },
            { attribute: 'digitsBetween:4,6' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should pass', async () => {

        const v = new Validator(
            { attribute: '125012' },
            { attribute: 'digitsBetween:4,6' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should fail: invalid min', async () => {

        const v = new Validator(
            { attribute: '1' },
            { attribute: 'digitsBetween:2,3' }
        );

        const matched = await v.check();


        assert.equal(matched, false);

        //console.log(v.errors);

    });

    it('validation should fail: invalid max', async () => {

        const v = new Validator(
            { attribute: '123456' },
            { attribute: 'digitsBetween:2,3' }
        );

        const matched = await v.check();


        assert.equal(matched, false);

        //console.log(v.errors);

    });

    it('validation should fail: invalid val', async () => {

        const v = new Validator(
            { attribute: 'asdfd' },
            { attribute: 'digitsBetween:2,3' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('digitsBetween', 'attribute', '',[2,3]));

    });

});
