const assert = require('assert');
const t = require('../../src/transform');

describe('transform-percentageIfThisNumberIs-rules', function () {

    describe('#percentageIfThisNumberIs', function () {

        it('should return true when percentageIfThisNumberIs =', async () => {
            const v = ['percentageIfThisNumberIs:=,3,age'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        name: 'comparison',
                        options: [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        type: 'enum',
                        value: '='
                    },{
                        name: 'percent',
                        type: 'integer',
                        value: 3

                    },
                    {
                        name: 'input',
                        type: 'reference',
                        value: 'age'
                    }
                ],
                    'name': 'percentageIfThisNumberIs',
                    'types': ['integer'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string percentageIfThisNumberIs =', async () => {
            const stringMatch = ['percentageIfThisNumberIs:=,3,age'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        name: 'comparison',
                        options: [
                            '<',
                            '>',
                            '<=',
                            '>=',
                            '='
                        ],
                        type: 'enum',
                        value: '='
                    },{
                        name: 'percent',
                        type: 'integer',
                        value: 3

                    },
                    {
                        name: 'input',
                        type: 'reference',
                        value: 'age'
                    }
                ],
                    'name': 'percentageIfThisNumberIs',
                    'types': ['integer'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});