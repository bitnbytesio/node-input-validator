const assert = require('assert');
const _ = require('lodash');
const t = require('../../src/transform');

describe('transform-regex-rules', function () {

    describe('#regex', function () {

        it('should return true when have :', async () => {
            const v = ['regex:jsjsj:ssss'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj:ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when have |', async () => {
            const v = ['regex:jsjsj|ssss'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj|ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when have ,', async () => {
            const v = ['regex:jsjsj,ssss'];
            const obj = t.transformToObject(v);
            const objMatch = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj,ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false,
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when the string have :', async () => {
            const stringMatch = ['regex:jsjsj:ssss'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj:ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have |', async () => {
            const stringMatch = ['regex:jsjsj|ssss'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj|ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

        it('should return true when the string have ,', async () => {
            const stringMatch = ['regex:jsjsj,ssss'];
            const objToTransform = {
                params: [{
                    'arguments': [{
                        'name': 'rule',
                        'type': 'string',
                        'value': 'jsjsj,ssss'
                    }],
                    'name': 'regex',
                    'options': undefined,
                    'types': ['string'],
                }],
                required: false,
            };
            const result = t.transformToString(objToTransform);
            assert.equal(JSON.stringify(result), JSON.stringify(stringMatch));
        });

    });
});