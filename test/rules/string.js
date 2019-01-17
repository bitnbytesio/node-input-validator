const assert = require('assert');

const Validator = require('../../index');

describe('empty string', function () {

    it('should ignore empty string in not required fields', async () => {

        let v = new Validator({ field: 'test' }, { field: 'string' });

        let matched = await v.check();
        assert.equal(matched, true);

    });

    it('should reject array in string fields', async () => {

        let v = new Validator({ field: [1, 2] }, { field: 'string' });

        let matched = await v.check();
        assert.equal(matched, false);

    });

    it('should reject object in string fields', async () => {

        let v = new Validator({ field: {} }, { field: 'string' });

        let matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.field.message, v.parseExistingMessageOnly('string', 'field'));

    });

    it('should reject empty string in required fields', async () => {

        let v = new Validator({ field: '' }, { field: 'required|string' });

        let matched = await v.check();
        assert.equal(matched, false);

       

    });

});