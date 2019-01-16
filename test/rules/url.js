const assert = require('assert');

const Validator = require('../../index');


describe('#same', function () {

    it('#url', async () => {



        let v = new Validator({ url: 'http://www.github.com' }, { url: 'required|url' });

        let matched = await v.check();

        assert.equal(matched, true);


    });

    it('should fail', async () => {


        const v = new Validator({ url: 'artisangang' }, { url: 'required|url' });

        const matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.url.message, v.parseExistingMessageOnly('url', 'url'));

    });

});