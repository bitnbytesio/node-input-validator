const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Array Fields', function () {



    it('should return false', async () => {

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

        v.errors.should.have.keys('plan.1.price', 'plan.1.title', 'plan.2.title', 'plan.3.price');

        assert.equal(matched, false);

    });



});