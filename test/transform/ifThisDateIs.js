const assert = require('assert');
const t = require('../../src/transform');

describe('transform-ifThisDateIs-rules', function () {

    describe('#ifThisDateIs', function () {

        it('should return true when ifThisDateIs =', async () => {
            const v = ['ifThisDateIs:=,olderDate'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": "="
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when ifThisDateIs >', async () => {
            const v = ['ifThisDateIs:>,olderDate'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": ">"
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when ifThisDateIs <', async () => {
            const v = ['ifThisDateIs:<,olderDate'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": "<"
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when ifThisDateIs <=', async () => {
            const v = ['ifThisDateIs:<=,olderDate'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                'arguments': [{
                    "name": "comparison",
                    "options": [
                        '<',
                        '>',
                        '<=',
                        '>=',
                        '='
                    ],
                    "type": "enum",
                    "value": "<="
                },{
                    "name": "date",
                    "type": "date",
                    "value": "olderDate"
                }
            ],
                'name': 'ifThisDateIs',
                'types': ['date'],
            }],
            required: false,
        };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when ifThisDateIs >=', async () => {
            const v = ['ifThisDateIs:>=,olderDate'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": ">="
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string ifThisDateIs =', async () => {
            const stringMatch = ['ifThisDateIs:=,olderDate'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": "="
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string ifThisDateIs >', async () => {
            const stringMatch = ['ifThisDateIs:>,olderDate'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": ">"
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string ifThisDateIs <', async () => {
            const stringMatch = ['ifThisDateIs:<,olderDate'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": "<"
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when ifThisDateIs <=', async () => {
            const stringMatch = ['ifThisDateIs:<=,olderDate'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": "<="
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string ifThisDateIs >=', async () => {
            const stringMatch = ['ifThisDateIs:>=,olderDate'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        "name": "comparison",
                        "options": [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        "type": "enum",
                        "value": ">="
                    },{
                        "name": "date",
                        "type": "date",
                        "value": "olderDate"
                    }
                ],
                    'name': 'ifThisDateIs',
                    'types': ['date'],
                }],
                required: false
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});