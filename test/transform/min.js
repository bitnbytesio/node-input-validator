const assert = require('assert');
const t = require('../../src/transform/transform');

describe('transform-min-rules', function () {

    describe('#min', function () {

        it('should return true when min arguments', async () => {
            const v = ['min:1'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'min value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'min',
                    'types': ['integer', 'number'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string min arguments', async () => {
            const stringMatch = ['min:1'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'min value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'min',
                    'types': ['integer', 'number'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});