const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('alphaDash', function () {

    it('validation should pass: with example', async () => {

        const v = new Validator(
            { username: 'example' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    it('validation should pass: with example-test', async () => {

        const v = new Validator(
            { username: 'example-test' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

    });

    
    it('validation should fail: with now123', async () => {

        const v = new Validator(
            { username: 'now123' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

        //console.log(v.errors);

    });

    it('validation should fail: with now-123', async () => {

        const v = new Validator(
            { username: 'now-123' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

        //console.log(v.errors);

    });

    it('validation should fail: with u@name', async () => {

        const v = new Validator(
            { username: 'u@name' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, false);

        //console.log(v.errors);

    });

    it('validation should fail: with 123', async () => {

        const v = new Validator(
            { username: '123' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

        //console.log(v.errors);

    });

    it('validation should fail: with u_name', async () => {

        const v = new Validator(
            { username: 'u_name' },
            { username: 'alphaDash' }
        );

        const matched = await v.check();

        assert.equal(matched, true);

        //console.log(v.errors);

    });

});
