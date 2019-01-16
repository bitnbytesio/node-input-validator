const assert = require('assert'),
    fs = require('fs');

const Validator = require('../../index');

describe('mime', function () {

    it('should return true', async () => {

        let v = new Validator(
            { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb|mime:png,jpg' });


        let matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        let v = new Validator(
            { file: './test/stubs/file-small.png' }, { file: 'size:4kb|mime:png,jpg' });


        let matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false', async () => {

        let v = new Validator(
            { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'mime:gif,bmp' });


        let matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false', async () => {

        let v = new Validator(
            { file: './test/stubs/file-small.png' }, { file: 'mime:gif,bmp' });


        let matched = await v.check();

        assert.equal(matched, false);

        console.log(v.errors.file.message);

        assert.equal(v.errors.file.message, v.parseExistingMessageOnly('mime', 'file', '', ['gif', 'bmp']));

    });

});