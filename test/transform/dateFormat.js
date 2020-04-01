const assert = require('assert');
const t = require('../../src/transform/transform');

describe('transform-dateFormat-rules', function () {

    describe('#dateFormat', function () {

        it('should return true when have options', async () => {
            const v = ['dateFormat:ddmmyyyy'];
            const obj = t.toObject(v);
            const match = {
                params: [{
                    'arguments': [{
                        'name': 'formatting',
                        'options': [
                            'YYYY',
                            'YYYY-MM',
                            'YYYY-MM-DD',
                            'YYYY-MM-DDThh:mmTZD',
                            'YYYY-MM-DDThh:mm:ssTZD',
                            'YYYY-MM-DDThh:mm:ss.sTZD',
                        ],
                        'type': 'enum',
                        'value': 'ddmmyyyy'
                    }],
                    'name': 'dateFormat',
                    'options': undefined,
                    'types': ['date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when have options and is required', async () => {
            const v = ['required','dateFormat:YYYY'];
            const obj = t.toObject(v);
            const match = {
                params: [{
                    'name': 'required',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }, {
                    'arguments': [{
                        'name': 'formatting',
                        'options': [
                            'YYYY',
                            'YYYY-MM',
                            'YYYY-MM-DD',
                            'YYYY-MM-DDThh:mmTZD',
                            'YYYY-MM-DDThh:mm:ssTZD',
                            'YYYY-MM-DDThh:mm:ss.sTZD',
                        ],
                        'type': 'enum',
                        'value': 'YYYY'
                    }],
                    'name': 'dateFormat',
                    'options': undefined,
                    'types': ['date'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(match));
        });

        it('should return true when the string have options', async () => {
            const stringMatch = ['dateFormat:ddmmyyyy'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        'name': 'formating',
                        type: 'string',
                        'value': 'ddmmyyyy'
                    }],
                    'name': 'dateFormat',
                    'options': undefined,
                    'types': ['date'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have options and is required', async () => {
            const stringMatch = ['required','dateFormat:ddmmyyyy'];
            const objToTransform = {
                params: [{
                    'name': 'required',
                    'types': ['string', 'integer', 'boolean', 'date'],
                }, {
                    'arguments': [{
                        'name': 'formating',
                        type: 'string',
                        'value': 'ddmmyyyy'
                    }],
                    'name': 'dateFormat',
                    'options': undefined,
                    'types': ['date'],
                }],
            };
            const result = t.normalize(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});