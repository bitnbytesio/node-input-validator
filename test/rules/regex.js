const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('regex', function () {

    it('validation should pass', async () => {

        let v = new Validator(
            { number: 'abc' }, { number: 'regex:[abc]' });

        let matched = await v.check();

        assert.equal(matched, true);

    });





    it('validation should fail', async () => {



        let v = new Validator(
            { attribute: 'xyz' }, { attribute: 'regex:[abc]' });

        let matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('regex', 'attribute', '',4));

    });


  

});
