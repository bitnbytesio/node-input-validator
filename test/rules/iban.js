const assert = require('assert');

const Validator = require('../../index');


let r = {};


describe('iban', function () {

    it('validation should pass for a valid Belgian IBAN', async () => {
        const v = new Validator(
            { attribute: 'BE68539007547034' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('validation should pass for a valid Dutch IBAN', async () => {
        const v = new Validator(
            { attribute: 'NL86INGB0002445588' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('validation should pass for a valid Saint-Lucia IBAN', async () => {
        const v = new Validator(
            { attribute: 'LC55HEMM000100010012001200023015' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('validation should pass for a valid Moldovan IBAN', async () => {
        const v = new Validator(
            { attribute: 'MD75EX0900002374642125EU' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('validation should pass for a valid Côte d\'Ivoire IBAN', async () => {
        const v = new Validator(
            { attribute: 'CI93CI0080111301134291200589' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, true);
    });

    it('validation should fail: iban not a string (number)', async () => {
        const v = new Validator(
            { attribute: 1 },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iban', 'attribute', ''));
    });

    it('validation should fail: iban not a string (object)', async () => {
        const v = new Validator(
            { attribute: {} },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iban', 'attribute', ''));
    });

    it('validation should fail: iban not a string (boolean)', async () => {
        const v = new Validator(
            { attribute: '000myaccount123' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iban', 'attribute', ''));
    });

    it('validation should fail: invalid iban string', async () => {
        const v = new Validator(
            { attribute: '000myrandomstring123' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iban', 'attribute', ''));
    });

    it('validation should fail: unknow country code digit', async () => {
        const v = new Validator(
            { attribute: 'ZZ68539007547034' },
            { attribute: 'iban' }
        );
        const matched = await v.check();
        assert.equal(matched, false);
        assert.equal(v.errors.attribute.message, v.parseExistingMessageOnly('iban', 'attribute', ''));
    });
});
