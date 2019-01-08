const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('digits', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { attribute: '1250' },
            { attribute: 'digits:4' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });
   

    it('validation should fail: invalid val', async () => {

        const v = new Validator(
            { attribute: 'a12' },
            { attribute: 'digits' }
        );

        const matched = await v.check();


        assert.equal(matched, false);

        //console.log(v.errors);

    });

});
