const assert = require('assert');

const Validator = require('../index');

let r = {};

describe('Multiple rules test', function () {

    describe('required|minLength|maxLength|alpha', function () {

        it('should return true', async () => {

            //{ name: 'required|minLength:5|maxLength:8|alpha' }
            // @ts-ignore
            let vi = Validator.make(
                { name: 'artisan' }
            );

            let v = Validator.make(
                { name: 'artisan' },
                {
                    name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha']
                });

            let matched = await v.check();

            //console.log(v.errors);

            assert.equal(matched, true);

        });

        it('should return false due to minLength failed', async () => {

            let v = Validator.make(
                { name: 'art' },
                {
                    name: ['required', ['minLength', '5'], ['maxLength', '10'], 'alpha']
                });

            let matched = await v.check();

            assert.equal(matched, false);


        });

        it('should return false due to lengthBetween failed', async () => {

            let v = Validator.make(
                { uid: 'abcdefghi' },
                {
                    uid: ['required', ['lengthBetween', '5', '8'], 'alpha']
                });
            let matched = await v.check();

            assert.equal(matched, false);


        });

        it('regex delimiters fix', async () => {

            let v = Validator.make(
                { uid: 'xyz' },
                {
                    uid: ['required', ['regex', 'abc|xyz']]
                });
            let matched = await v.check();

            assert.equal(matched, true);


        });

    });

});
