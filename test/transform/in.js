const assert = require('assert');
const t = require('../../src/transform');

describe('transform-in-rules', function () {

    describe('#in', function () {
        it('should return true when have arguments', async () => {
            const v = ['in:1,2,q,4,5'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when have 2 rules', async () => {
            const v = ['in:1,2,q,4,5','between:1,2'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
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
                }
            ],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when have 2 rules and is required', async () => {
            const v = ['required','in:1,2,q,4,5','between:1,2'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
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
                }
            ],
                required: true
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string have arguments', async () => {
            const stringMatch = ['in:1,2,q,4,5'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }],
                required: false
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have 2 rules', async () => {
            const stringMatch = ['in:1,2,q,4,5','between:1,2'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
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
                }
            ],
                required: false
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have 2 rules and is required', async () => {
            const stringMatch = ['required','in:1,2,q,4,5','between:1,2'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'list of values',
                        type: 'array',
                        value: ['1', '2', 'q', '4', '5']
                    }],
                    'name': 'in',
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
                }
            ],
                required: true
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});