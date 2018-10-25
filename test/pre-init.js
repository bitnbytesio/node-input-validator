// const assert = require('assert');

// const should = require('should');

// const Validator = require('../index');


// const v1 = Validator.make({
//     name: 'required|maxLength:5',

// });

// const v2 = Validator.make({
//     name: 'required|minLength:5|maxLength:8|alpha',
//     password: 'required|maxLength:5',
//     age: 'max:23',
//     email: 'required|email'
// });

// describe('Pre Init', function () {

//     describe('#1 single field', function () {

//         it('should return true', async () => {


//             let sess = await v1.apply({
//                 name: 'Harry'
//             });

//             let matched = await sess.fails();

//             assert.equal(matched, false);

//         });

//         it('should return false', async () => {


//             let sess = await v1.apply({
//                 name: 'Harcaran Singh'
//             });

//             let matched = await sess.fails();

//             assert.equal(matched, true);

//             should(sess.errors).be.an.instanceOf(Object);
//             should(sess.errors).have.property('name');

//         });

//     });

//     describe('#2 multiple fields', function () {


//         it('should return true', async () => {

//             let sess = await v2.apply({
//                 name: 'artisan',
//                 password: '00000',
//                 age: 20,
//                 email: 'artisangang@gmail.com'
//             });

//             let matched = await sess.fails();

//             assert.equal(matched, false);

//         });

//         it('should return fails due to age and email', async () => {

//             let sess = await v2.apply({
//                 name: 'artisan',
//                 password: '00000',
//                 age: 31,
//             });

//             let matched = await sess.fails();

//             assert.equal(matched, true);

//             //console.log(v2.errors);

//             should(sess.errors).be.an.instanceOf(Object);

//             should(sess.errors).have.property('email');
//             should(sess.errors).have.property('age');

//         });


//     });

// });