const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.messages({
    required: 'The :attribute field must not be empty.',
});


let r = {};

describe('Custom messages', function () {

    describe('Using custom message for required', function () {

        it('should return custom message', async () => {


            let v = new Validator(r,
                {}, {number: "required"});

            let matched = await v.check();

            assert.equal(matched, false);

            v.errors.should.have.property('number').and.be.a.Object();
            v.errors.number.should.have.property('message', 'The number field must not be empty.');


        });

    });


});