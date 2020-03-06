const assert = require('assert');

const Validator = require('../index');

let r = {};

describe('Array Fields', function () {

    it('should pass', async () => {

        let v = new Validator(
            {
                plan: [
                    { price: '25', title: 'OK' },
                    { price: '30' },
                ]
            },
            {
                'plan.*.price': 'required|integer'
            });

        let matched = await v.check();


        assert.equal(matched, true);

    });

    it('should pass', async () => {

        let v = new Validator(
            {
                plan: [15, 30, 40]
            },
            {
                'plan.*': 'required|integer'
            });

        let matched = await v.check();


        assert.equal(matched, true);

    });

    it('should fail of rule integer', async () => {

        let v = new Validator(
            {
                plan: ['ghj', 'ji', 'lp']
            },
            {
                'plan.*': 'required|integer'
            });

        let matched = await v.check();


        assert.equal(matched, false);

    });



    it('should fail of index 1 price|title and index 3 price required', async () => {

        let v = new Validator(
            {
                plan: [
                    { price: '25', title: 'OK' },
                    { price: '', title: '' },
                    { price: '30' },
                    { price: '', title: 'Title' }
                ]
            },
            {
                'plan.*.price': 'required|integer',
                'plan.*.title': 'required'
            });

        let matched = await v.check();

        assert.equal(matched, false);

    });



});