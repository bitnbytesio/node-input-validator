const assert = require('assert');

const Validator = require('../index');

let r = {};

describe('crash test', function () {

    describe('#clousers and hex', function () {

        it('should return true', async () => {

            let v = new Validator({ name: function () {}, tape: 0x023 }, { name: 'required', tape: 'required|integer' });

            let matched = await v.check();

            assert.equal(matched, true);

        });       

    });
});