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

describe('between exception', () => {
    it('Between: Checking for invalid seed count', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|between:a' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: The number of arguments for between in the field attribute are invalid.');
        }

    });


    it('Between: Checking for invalid seed min', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|between:a,10' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for between rule.');
        }

    });

    it('Between: Checking for invalid seed max', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|between:10,b' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for between rule.');
        }

    });


    it('Between: Checking for invalid seed min and max', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|between:10,5' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seed min must be less then max in between.');
        }

    });
})


describe('lengthBetween exception', () => {
    it('Between: Checking for invalid seed count', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|lengthBetween:a' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: The number of arguments for length between in the field attribute are invalid.');
        }

    });


    it('Between: Checking for invalid seed min', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|lengthBetween:a,10' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for lengthBetween rule.');
        }

    });

    it('Between: Checking for invalid seed max', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|lengthBetween:10,b' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for lengthBetween rule.');
        }

    });


    it('Between: Checking for invalid seed min and max', async () => {

        try {

            let v = new Validator({ attribute: "789456" }, { attribute: 'required|lengthBetween:10,5' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seed min must be less then max in lengthBetween.');
        }

    });
})

describe('digitsBetween exception', () => {

    it('Non numeric value', async () => {


        let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|digitsBetween' });

        const matched = await v.check();

        assert.equal(matched, false);


    });

    it('Between: Checking for invalid seed count', async () => {

        try {

            let v = new Validator({ attribute: "789456" }, { attribute: 'required|digitsBetween:a' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: The number of arguments for digits between in the field attribute are invalid.');
        }

    });


    it('Between: Checking for invalid seed min', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|digitsBetween:a,10' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for digits between rule.');
        }

    });

    it('Between: Checking for invalid seed max', async () => {

        try {

            let v = new Validator({ attribute: "Harcharan Singh" }, { attribute: 'required|digitsBetween:10,b' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seeds must be integer for digits between rule.');
        }

    });


    it('Between: Checking for invalid seed min and max', async () => {

        try {

            let v = new Validator({ attribute: "789456123" }, { attribute: 'required|digitsBetween:10,5' });

            await v.check();

            // assert.equal(matched, true);
        } catch (e) {
            assert.equal(e, 'Error: Seed min must be less then max in digits between.');
        }

    });
})