const assert = require('assert');

const should = require('should');

const Validator = require('../index');

const fs = require('fs');

let r = {};

describe('File Rules', function () {

    describe('size', function () {

        it('should return true', async () => {

            let v = new Validator(
                { file: fs.readFileSync('./test/files/file-small.png') }, { file: 'size:4kb' });


            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true', async () => {

            let v = new Validator(
                { file: './test/files/file-small.png' }, { file: 'size:4kb' });


            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { file: fs.readFileSync('./test/files/file-small.png') }, { file: 'size:1kb' });


            let matched = await v.check();

            should(v.errors).have.property('file');
            should(v.errors.file).have.property('message');

            assert.equal(matched, false);

        });

        it('should return false', async () => {

            let v = new Validator(
                { file: './test/files/file-small.png' }, { file: 'size:1kb' });


            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).have.property('file');
            should(v.errors.file).have.property('message');

        });

    });


    describe('mime', function () {

        it('should return true', async () => {

            let v = new Validator(
                { file: fs.readFileSync('./test/files/file-small.png') }, { file: 'size:4kb|mime:png,jpg' });


            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return true', async () => {

            let v = new Validator(
                { file: './test/files/file-small.png' }, { file: 'size:4kb|mime:png,jpg' });


            let matched = await v.check();

            assert.equal(matched, true);

        });

        it('should return false', async () => {

            let v = new Validator(
                { file: fs.readFileSync('./test/files/file-small.png') }, { file: 'size:1kb|mime:gif,bmp' });


            let matched = await v.check();

            should(v.errors).have.property('file');
            should(v.errors.file).have.property('message');

            assert.equal(matched, false);

        });

        it('should return false', async () => {

            let v = new Validator(
                { file: './test/files/file-small.png' }, { file: 'size:1kb|mime:gif,bmp' });


            let matched = await v.check();

            assert.equal(matched, false);

            should(v.errors).have.property('file');
            should(v.errors.file).have.property('message');

        });

    });

});
