const assert = require('assert'),
    fs = require('fs');

const Validator = require('../../index');

describe('size', function () {

    it('should return true', async () => {

        let v = new Validator(
            { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:4kb' });


        let matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return true', async () => {

        let v = new Validator(
            { file: './test/stubs/file-small.png' }, { file: 'size:4kb' });


        let matched = await v.check();

        assert.equal(matched, true);

    });

    it('should return false', async () => {

        let v = new Validator(
            { file: fs.readFileSync('./test/stubs/file-small.png') }, { file: 'size:1kb' });


        let matched = await v.check();

        assert.equal(matched, false);

    });

    it('should return false', async () => {

        let v = new Validator(
            { file: './test/stubs/file-small.png' }, { file: 'size:1kb' });


        let matched = await v.check();

        assert.equal(matched, false);

        assert.equal(v.errors.file.message, v.parseExistingMessageOnly('size', 'file', '','1kb'));


    });

});