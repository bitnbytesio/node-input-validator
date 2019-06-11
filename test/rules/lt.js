const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('lt', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { min: '20', max: '25' },
            {
                min: 'required|integer|lt:max',
                max: 'required|integer'
            }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should fail', async () => {

        const v = new Validator(
            { min: '30', max: '25' },
            {
                min: 'required|integer|lt:max',
                max: 'required|integer'
            }
        );

        const matched = await v.check();

        assert.equal(matched, false);

    });


});
