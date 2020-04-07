const assert = require('assert');
const t = require('../../src/transform/transform');

describe('transform-dateAfter-rules', () => {
    describe('#dateAfter', () => {
        it('should return true when have options', async () => {
            const v = ['dateAfter:2000-15-31'];
            const obj = t.toObject(v);
            const match = {
                params: [{
                    arguments: [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31',
                    }],
                    name: 'dateAfter',
                    options: undefined,
                    types: ['date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when have options and is required', async () => {
            const v = ['required', 'dateAfter:2000-15-31'];
            const obj = t.toObject(v);
            const match = {
                params: [{
                    name: 'required',
                    types: ['string', 'integer', 'boolean', 'date'],
                }, {
                    arguments: [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31',
                    }],
                    name: 'dateAfter',
                    options: undefined,
                    types: ['date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when the string have options', async () => {
            const stringMatch = ['dateAfter:2000-15-31'];
            const objToTransform = {
                params: [{
                    arguments: [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31',
                    }],
                    name: 'dateAfter',
                    options: undefined,
                    types: ['date'],
                }],
                required: false,
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have options and is required', async () => {
            const stringMatch = ['required', 'dateAfter:2000-15-31'];
            const objToTransform = {
                params: [{
                    name: 'required',
                    types: ['string', 'integer', 'boolean', 'date'],
                }, {
                    arguments: [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31',
                    }],
                    name: 'dateAfter',
                    options: undefined,
                    types: ['date'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });
    });
});
