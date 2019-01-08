const assert = require('assert');

const Validator = require('../../index');

let r = {};



describe('function', function () {

    it('should use custom function', async () => {

        let v = new Validator({ username: 'arnold', password: 'arnold123' }, {});

        v.addPostRule(async function (input) {

            if (input.password.indexOf(input.username) >= 0) {
                this.addError('password', 'custom', 'Password cannot contain username');
            }
        });

        let matched = await v.check();

        assert.equal(matched, false);

        v = new Validator({ username: 'arnold', password: '123456' }, {});

        v.addPostRule(async function (input) {

            if (input.password.indexOf(input.username) >= 0) {
                this.addError('password', 'custom', 'Password cannot contain username');
            }
        });

        matched = await v.check();

        assert.equal(matched, true);

    });

});

