const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('ascii', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { username: 'sfsf46546*/-=-!@#$%^&*()_+!?><:"{}[];' },
            { username: 'ascii' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });




    it('validation should fail', async () => {

        const v = new Validator(
            { username: 'uname€' },
            { username: 'ascii' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.username.message, v.parseExistingMessageOnly('ascii', 'username'));

    });

});
