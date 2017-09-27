const assert = require('assert');

const should = require('should');

const Validator = require('../index');

const fs = require('fs');

let r = {};

describe('File Rules', function () {

    describe('size', function () {

        it('should return true', async () => {


            let v = new Validator(r,
                {file: fs.readFileSync('./test/files/file-small.png')}, {file: 'size:4kb'});


            let matched = await v.check();

            console.log(v.errors);

            assert.equal(matched, true);


        });

        it('should return false', async () => {


        });


    });
});