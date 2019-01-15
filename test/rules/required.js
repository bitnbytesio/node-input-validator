const assert = require('assert');


const Validator = require('../../index');

describe('requiredRules', function () {

    describe('#required', function () {

        it('should return true', async () => {

            let v = new Validator({ name: 'Harcharan Singh' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator({ name: '' }, { name: 'required' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('should return false', async () => {

            let v = new Validator({ name: '' }, { name: 'required|min:1' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

        it('should return false', async () => {

            let v = new Validator({ email: '' }, { name: 'required|email' });

            let matched = await v.check();

            assert.equal(matched, false);

            assert.equal(v.errors.name.message, v.parseExistingMessageOnly('required', 'name', '',4));

        });

    });
});