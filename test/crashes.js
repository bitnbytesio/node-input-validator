const assert = require('assert');

const Validator = require('../index');

let r = {};

describe('crash', function () {



    it('passing clousers and hex', async () => {

        let v = new Validator({ name: function () { }, tape: 0x023 }, { name: 'required', tape: 'required|integer' });

        let matched = await v.passes();

        assert.equal(matched, true);

    });


    it('Checking for invalid rule', async () => {

    

       try {

            let v = new Validator({ name: "Harcharan Singh" }, { name: 'required|fullName' });

             await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Invalid Validation Rule: fullName does not exist');
        }

    });


});