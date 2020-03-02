const assert = require('assert');
const t = require('../../src/transform');

describe('transform-max-rules', function () {

    describe('#max', function () {

        it('should return true when max arguments', async () => {
            const v = ['max:1'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'max value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'max',
                    'types': ['integer'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string max arguments', async () => {
            const stringMatch = ['max:1'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'max value',
                        type: 'integer',
                        value: 1
                    }],
                    'name': 'max',
                    'types': ['integer'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});