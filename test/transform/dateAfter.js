const assert = require('assert');
const _ = require('lodash');
const t = require('../../src/transform');

describe('transform-dateAfter-rules', function () {

    describe('#dateAfter', function () {

        it('should return true when have options', async () => {
            const v = ['dateAfter:2000-15-31'];
            const obj = t.transformToObject(v);
            const match = {
                params: [{
                    'arguments': [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31'
                    }],
                    'name': 'dateAfter',
                    'options': undefined,
                    'types': ['date'],
                }],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when have options and is required', async () => {
            const v = ['required','dateAfter:2000-15-31'];
            const obj = t.transformToObject(v);
            const match = {
                params: [{
                    'arguments': [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31'
                    }],
                    'name': 'dateAfter',
                    'options': undefined,
                    'types': ['date'],
                }],
                required: true
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when the string have options', async () => {
            const stringMatch = ['dateAfter:2000-15-31'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31'
                    }],
                    'name': 'dateAfter',
                    'options': undefined,
                    'types': ['date'],
                }],
                required: false
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have options and is required', async () => {
            const stringMatch = ['required','dateAfter:2000-15-31'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'date',
                        type: 'date',
                        value: '2000-15-31'
                    }],
                    'name': 'dateAfter',
                    'options': undefined,
                    'types': ['date'],
                }],
                required: true
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });
    });
});