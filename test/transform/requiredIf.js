const assert = require('assert');
const t = require('../../src/transform/transform');

describe('transform-requiredIf-rules', function () {

    describe('#requiredIf', function () {

        it('should return true when has one require if field', async () => {
            const v = ['requiredIf:human.age,16'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: "input",
                        type: "reference",
                        value: "human.age"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "16"
                    }
                ],
                    'name': 'requiredIf',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when has mutiple fields', async () => {
            const v = ['requiredIf:age,16,parent,yes,type,subscribed'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: "input",
                        type: "reference",
                        value: "age"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "16"
                    },{
                        name: "input",
                        type: "reference",
                        value: "parent"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "yes"
                    }, {
                        name: "input",
                        type: "reference",
                        value: "type"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "subscribed"
                    }],
                    'name': 'requiredIf',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string has one require if field', async () => {
            const stringMatch = ['requiredIf:human.age,16'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: "input",
                        type: "reference",
                        value: "human.age"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "16"
                    }
                ],
                    'name': 'requiredIf',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string has mutiple fields', async () => {
            const stringMatch = ['requiredIf:age,16,parent,yes,type,subscribed'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: "input",
                        type: "reference",
                        value: "age"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "16"
                    },{
                        name: "input",
                        type: "reference",
                        value: "parent"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "yes"
                    }, {
                        name: "input",
                        type: "reference",
                        value: "type"
                    },{
                        name: "reference value",
                        type: "string",
                        value: "subscribed"
                    }],
                    'name': 'requiredIf',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});