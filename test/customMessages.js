const assert = require('assert');

const should = require('should');

const Validator = require('../index');

Validator.messages({
    even: 'The value of the field must be an even number.',
    status: 'Invalid status.'
});

Validator.messages({
    even: 'Even number bharo.',
    status: 'Galat Status.'
}, 'pb');



Validator.customMessages({
    'status.required': 'Status khali nahi hona chahiye.'
}, 'hi');


Validator.extend('even', async function (field, value) {

    if ((parseInt(value) % 2) == 0) {
        return true;
    }

    return false;

});

Validator.extend('status', async function (field, value, args) {

    if (args.indexOf(value) >= 0) {
        return true;
    }

    return false;

});

let r = {};



// describe('Custom Messages', function () {

//     it('should return nested field message', async () => {

//         let v = new Validator(
//             { org: { name: "" } },
//             { org: 'required|object', 'org.name': 'required|string' },
//             { 'org.name': 'The compaany name filed is required' }
//         );

//         let matched = await v.check();

//         //throw v.errors;

//         // assert.equal(matched, true);

//     });


// });
