const assert = require('assert');

const Validator = require('../../index');


describe('#sametimes', function () {


    it('should fail', async () => {

        const v = new Validator(
            { password: '', confirm_password: 'password' },
            { password: 'sometimes', confirm_password: 'sometimes|alpha' });

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.password.message, v.parseExistingMessageOnly('sometimes', 'password', '',4));

    });

    it('should pass', async () => {

        let v, matched;

        v = new Validator(
            { password: '000000', confirm_password: '000000' },
            { password: 'sometimes', confirm_password: 'sometimes|same:password' });

        matched = await v.check();

        assert.equal(matched, true);
    });

    it('should pass', async () => {

        let v, matched;

        v = new Validator(
            {},
            { password: 'sometimes', confirm_password: 'sometimes|same:password' });

        matched = await v.check();

        assert.equal(matched, true);
    });



});