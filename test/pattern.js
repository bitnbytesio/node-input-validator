const assert = require('assert');

const should = require('should');

const Validator = require('../index');

let r = {};

describe('Pattern', function () {

    it('#alpha', async () => {

        let v = new Validator({ name: 'Harcharan' }, { name: 'alpha' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ name: '123456' }, { name: 'alpha' });

        matched = await v.check();

        assert.equal(matched, false);

        should(v.errors).be.an.instanceOf(Object);
        should(v.errors).have.property('name');


        v = new Validator({ name: 'ASD123456' }, { name: 'alpha' });

        matched = await v.check();

        assert.equal(matched, false);

        should(v.errors).be.an.instanceOf(Object);
        should(v.errors).have.property('name');



        v = new Validator({ name: 'ASD-QRT' }, { name: 'alpha' });

        matched = await v.check();

        assert.equal(matched, false);

        should(v.errors).be.an.instanceOf(Object);
        should(v.errors).have.property('name');


    });


    it('#alphaDash', async () => {



        let v = new Validator({ name: 'HarcharanSingh' }, { name: 'alphaDash' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ name: 'Harcharan_Singh' }, { name: 'alphaDash' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ name: 'Harcharan-Singh' }, { name: 'alphaDash' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ name: 'Harcharan Singh' }, { name: 'alphaDash' });

        matched = await v.check();

        assert.equal(matched, false);

        should(v.errors).be.an.instanceOf(Object);
        should(v.errors).have.property('name');



    });


    it('#alphaNumeric', async () => {



        let v = new Validator({ uuid: 'QWERTY' }, { uuid: 'alphaNumeric' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ uuid: '123456' }, { uuid: 'alphaNumeric' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ uuid: 'QWERTY123' }, { uuid: 'alphaNumeric' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ uuid: 'QWERTY-13' }, { uuid: 'alphaNumeric' });

        matched = await v.check();

        assert.equal(matched, false);

        should(v.errors).be.an.instanceOf(Object);
        should(v.errors).have.property('uuid');



    });

    it('#ascii', async () => {

        let v = new Validator({ uuid: 'QWERTY-13&pound' }, { uuid: 'ascii' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ uuid: 'QWERTY-13£' }, { uuid: 'ascii' });

        matched = await v.check();

        assert.equal(matched, false);

    });


    it('#base64', async () => {

        let v = new Validator({ uuid: 'UGx1dG8gU29mdHdhcmVz' }, { uuid: 'base64' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ uuid: 'abcdefghijk' }, { uuid: 'base64' });

        matched = await v.check();

        assert.equal(matched, false);

    });

    it('#creditCard', async () => {

        let v = new Validator({ cc: '5290846149643995' }, { cc: 'creditCard' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ cc: '42569815' }, { cc: 'creditCard' });

        matched = await v.check();

        assert.equal(matched, false);

    });

    it('#latLong', async () => {

        let v = new Validator({ cordinates: '37.7192,-127.1023' }, { cordinates: 'latLong' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ cordinates: '390,890' }, { cordinates: 'latLong' });

        matched = await v.check();

        assert.equal(matched, false);

    });

    it('#email', async () => {



        let v = new Validator({ email: 'artisangang@gmail.com' }, { email: 'required|email' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ email: 'artisangang.gmail.com' }, { email: 'required|email' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#json', async () => {



        let v = new Validator({ data: '["192.168.1.1","127.0.0.1"]' }, { data: 'required|json' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ data: 'artisangang.gmail.com' }, { data: 'required|json' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#ip', async () => {



        let v = new Validator({ ip: '192.168.1.1' }, { ip: 'required|ip' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ ip: 'artisangang.gmail.com' }, { ip: 'required|ip' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#url', async () => {



        let v = new Validator({ url: 'http://www.github.com' }, { url: 'required|url' });

        let matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ url: 'artisangang' }, { url: 'required|url' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#domain', async () => {



        let v = new Validator({ url: 'github.com' }, { url: 'required|domain' });

        let matched = await v.check();

        assert.equal(matched, true);

        v = new Validator({ url: 'www.github.com' }, { url: 'required|domain' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ url: 'artisangang' }, { url: 'required|domain' });

        matched = await v.check();

        assert.equal(matched, false);



    });


    it('#hash', async () => {



        let v = new Validator({ id: 'fd1baf48377a9f644f9af89abbee29f6' }, { id: 'required|hash:md5' });

        let matched = await v.check();

        assert.equal(matched, true);

        v = new Validator({ id: '3de76d4897cfdfd9a44c66d124640a0d943ed592' }, { id: 'required|hash:sha1' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ url: 'artisangang' }, { url: 'required|hash:sha512' });

        matched = await v.check();

        assert.equal(matched, false);



    });


    it('#hexColor', async () => {



        let v = new Validator({ id: '#FF0000' }, { id: 'required|hexColor' });

        let matched = await v.check();

        assert.equal(matched, true);

        v = new Validator({ id: 'FF0000' }, { id: 'required|hexColor' });

        matched = await v.check();

        assert.equal(matched, true);

        v = new Validator({ id: 'fff' }, { id: 'required|hexColor' });

        matched = await v.check();

        assert.equal(matched, true);

        v = new Validator({ id: 'f00' }, { id: 'required|hexColor' });

        matched = await v.check();

        assert.equal(matched, true);



        v = new Validator({ id: 'abcd' }, { id: 'required|hexColor' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#hex', async () => {



        let v = new Validator({ id: '69206d206a7573742074657374696e67' }, { id: 'required|hex' });

        let matched = await v.check();

        assert.equal(matched, true);      


        v = new Validator({ url: 'artisangang' }, { url: 'required|hex' });

        matched = await v.check();

        assert.equal(matched, false);



    });


    it('#Iso8601', async () => {



        let v = new Validator({ id: '2018-09-04T15:14:06+00:00' }, { id: 'required|iso8601' });

        let matched = await v.check();

        assert.equal(matched, true);


        v = new Validator({ url: 'artisangang' }, { url: 'required|iso8601' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#MacAddress', async () => {



        let v = new Validator({ id: '00:14:22:01:23:45' }, { id: 'required|macAddress' });

        let matched = await v.check();

        assert.equal(matched, true);


        v = new Validator({ url: 'artisangang' }, { url: 'required|macAddress' });

        matched = await v.check();

        assert.equal(matched, false);



    });

    it('#PhoneNumber', async () => {



        let v = new Validator({ id: '+918699987073' }, { id: 'required|phoneNumber' });

        let matched = await v.check();

        assert.equal(matched, true);


        v = new Validator({ id: '+1-541-754-3010' }, { id: 'required|phoneNumber' });
        matched = await v.check();

        assert.equal(matched, true);


        v = new Validator({ url: 'artisangang' }, { url: 'required|phoneNumber' });

        matched = await v.check();

        assert.equal(matched, false);



    });


    it('#MongoId', async () => {



        let v = new Validator({ id: '507f191e810c19729de860ea' }, { id: 'required|mongoId' });

        let matched = await v.check();

        assert.equal(matched, true);


      
        v = new Validator({ url: 'artisangang' }, { url: 'required|mongoId' });

        matched = await v.check();

        assert.equal(matched, false);



    });

});