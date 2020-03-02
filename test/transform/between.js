const assert = require('assert');
const t = require('../../src/transform');

describe('transform-between-rules', function () {

    describe('#between', function () {

        it('should return true when have arguments', async () => {
            const v = ['required', 'between:1,2'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'name': 'required',
                    'arguments': undefined,
                    'types': ['string', 'integer', 'boolean', 'date'],
                },{
                    'arguments': [{
                        name: 'min',
                        type: 'integer',
                        value: 1
                    },{
                        name: 'max',
                        type: 'integer',
                        value: 2
                    }
                ],
                    'name': 'between',
                    'types': ['integer'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when have arguments required and between case', async () => {
            const v = ['between:1,2'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'min',
                        type: 'integer',
                        value: 1
                    },{
                        name: 'max',
                        type: 'integer',
                        value: 2
                    }
                ],
                    'name': 'between',
                    'types': ['integer'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string have arguments and required', async () => {
            const v = ['required','between:1,2'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'name': 'required',
                    'types': ['string', 'integer', 'boolean', 'date'],
                },{
                    'arguments': [{
                        name: 'min',
                        type: 'integer',
                        value: 1
                    },{
                        name: 'max',
                        type: 'integer',
                        value: 2
                    }
                ],
                    'name': 'between',
                    'types': ['integer'],
                }]
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string have arguments', async () => {
            const stringMatch = ['between:1,2'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'min',
                        type: 'integer',
                        value: 1
                    },{
                        name: 'max',
                        type: 'integer',
                        value: 2
                    }
                ],
                    'name': 'between',
                    'types': ['integer'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when have arguments and required', async () => {
            const stringMatch = ['required','between:1,2'];
            const objToTransform = {
                params: [{
                    'name': 'required',
                    'types': ['string', 'integer', 'boolean', 'date'],
                },{
                    'arguments': [{
                        name: 'min',
                        type: 'integer',
                        value: 1
                    },{
                        name: 'max',
                        type: 'integer',
                        value: 2
                    }
                ],
                    'name': 'between',
                    'types': ['integer'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});