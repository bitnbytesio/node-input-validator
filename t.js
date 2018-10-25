
const Validator = require('./index');

const assert = require('assert');



async function t1(i = 0) {

    console.time('t1-' + i);

    const v = new Validator({
        name: 'artisangang',
        password: '0000000000',
        age: 31,
    }, {
            name: 'required|minLength:5|maxLength:8|alpha',
            password: 'required|maxLength:5',
            age: 'max:23',
            email: 'required|email'
        });


    let matched = await v.fails();


    console.timeEnd('t1-' + i);

    assert.equal(matched, true);
}

let vSet = Validator.create({
    name: 'required|minLength:5|maxLength:8|alpha',
    password: 'required|maxLength:5',
    age: 'max:23',
    email: 'required|email'
});

async function t2(i = 0) {

    console.time('t2-' + i);


    let v = await vSet.apply({
        name: 'artisangang',
        password: '0000000000',
        age: 31,
    });

    let matched = await v.fails();

    console.timeEnd('t2-' + i);

    assert.equal(matched, true);
}

for (let i = 0; i <= 10; i++) {
    t2(i);
    t1(i);
    
}