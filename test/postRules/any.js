const assert = require('assert');

const Validator = require('../../index');

let r = {};

describe('Post', function () {

    describe('any', function () {

        it('should return true when at least one field exists', async () => {

            let v = new Validator({ field1: '1' }, { '*': 'any:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false when there is no fields', async () => {

            let v = new Validator({}, { '*': 'any:field1,field2,field3' });

            let matched = await v.check();

            assert.equal(matched, false);

        });

    });



});