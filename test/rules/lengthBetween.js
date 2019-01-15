const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('lengthBetween: string', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { age: 'unamea' },
            { age: 'lengthBetween:5,10' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should fail', async () => {

        const v = new Validator(
            { age: 'name' },
            { age: 'lengthBetween:5,21' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        //console.log(v.errors);

    });

});

describe('lengthBetween: with array', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { features: [1, 2, 3, 4] },
            { features: 'lengthBetween:3,5' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should fail', async () => {

        const v = new Validator(
            { features: [1, 2] },
            { features: 'lengthBetween:3,6' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.features.message, v.parseExistingMessageOnly('lengthBetween', 'features', '', [3,6]));

    });

});