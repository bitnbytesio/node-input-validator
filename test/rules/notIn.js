const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('notIn', function () {

    it('validation should pass', async () => {

        const v = new Validator(
            { attribute: 'public' },
            { attribute: 'notIn:private,draft' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });


    it('validation should fail: misnotIng attribute', async () => {

        const v = new Validator(
            { attribute: 'draft' },
            { attribute: 'notIn:public,draft' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('notIn', 'attribute', '', ['public', 'draft']));

    });

});
