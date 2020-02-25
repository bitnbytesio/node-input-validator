const assert = require('assert');
const t = require('../../src/transform');

describe('transform-min-rules', function () {

    describe('#min', function () {

        it('should return true when min arguments', async () => {
            const v = ['min:1'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'min value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'min',
                    'types': ['integer'],
                }],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string min arguments', async () => {
            const stringMatch= ['min:1'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'min value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'min',
                    'types': ['integer'],
                }],
                required: false
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});