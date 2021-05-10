const assert = require('assert');
const t = require('../../src/transform/transform');

describe('transform-accpeted-rules', function () {

    describe('#accepted', function () {

        it('should return true when have arguments', async () => {
            const v = ['required', 'accepted'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'name': 'required',
                    'types': ['string', 'integer', 'boolean', 'date', 'number'],
                }, {
                    'name': 'accepted',
                    'types': ['string', 'integer', 'boolean', 'date', 'number'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });

        it('should return true when accepted case', async () => {
            const v = ['accepted'];
            const obj = t.toObject(v);
            const objMatch = {
                params: [{
                    'name': 'accepted',
                    'types': ['string', 'integer', 'boolean', 'date', 'number'],
                }],
            };
            assert.equal(JSON.stringify(obj), JSON.stringify(objMatch));
        });
    });
});