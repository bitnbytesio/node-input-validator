# Validation Library


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Known Vulnerabilities](https://snyk.io/test/npm/node-input-validator/badge.svg)](https://snyk.io/test/npm/node-input-validator)
[![Coverage Status](https://coveralls.io/repos/github/artisangang/node-input-validator/badge.svg)](https://coveralls.io/github/artisangang/node-input-validator)
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]

[travis-image]: https://api.travis-ci.org/artisangang/node-input-validator.svg?branch=master
[travis-url]: https://travis-ci.org/artisangang/node-input-validator

[david-image]: https://david-dm.org/artisangang/node-input-validator.svg?style=flat-square
[david-url]: https://david-dm.org/artisangang/node-input-validator

[npm-image]: https://img.shields.io/npm/v/node-input-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-input-validator
[node-image]: https://img.shields.io/badge/node.js-%3E=_7.6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

Validation library for Node.js

Node Input Validator is a validation library for Node.js. You can also extend library to add custom rules.

## Installation

```shell
npm install --save uberforcede/node-input-validator
```
Note: We highly recommend to add "#v{replace_with_release_number}" in the end of the github repo to set the version.

## Usage

Simple Example

```javascript

const v = require('node-input-validator');

let validator = new v({name:''}, {name:'required|minLength:5'});

validator.check().then(function (matched) {
    console.log(matched);
    console.log(validator.errors);
});

```

Example usage in express application

```javascript

const v = require('node-input-validator');

app.post('login', function (req, res) {

    let validator = new v( req.body, {
        email:'required|email',
        password: 'required'
    });

    validator.check().then(function (matched) {
        if (!matched) {
            res.status(422).send(validator.errors);
        }
    });

})

```

With async/await

```javascript

const v = require('node-input-validator');

router.post('login', async function (ctx) {

    let validator = new v( ctx.request.body, {
        email:'required|email',
        password: 'required'
        });

    let matched = await validator.check();

    if (!matched) {
        ctx.status = 422;
        ctx.body = validator.errors;
        return;
    }

})

```

### Objects Validation

```javascript
    let v = new Validator({
            product: {id:'1',name:'',price:'', active:'yes'}
        },
        {
            'product': 'required|object',
            'product.id': 'required|integer',
            'product.name': 'required',
            'product.price': 'required|integer',
            'product.active': 'required|integer'
        });

    let matched = await v.check();
```

### Array Validation

```javascript
    let v = new Validator({
            roles: ['admin', 'manager', 'member']
        },
        {
            'roles': 'required|array',
            'roles.*': 'required|string'
        });

    let matched = await v.check();
```

```javascript
    let v = new Validator({
            plan: [
                {price:'25',title:'OK'},
                {price:'',title:''},
                {price:'30'},
                {price:'',title:'Title'}
            ]
        },
        {
            'plan': 'required|array',
            'plan.*.price': 'required|integer',
            'plan.*.title': 'required'
        });

    let matched = await v.check();
```

## Extending

Placeholder in messages, :attribute will be replaced with field name, :value with field value and :arg0, :arg1 ...n with arguments passed to rule.

### Add/Update rule based messages

```javascript

Validator.messages({
    required: 'The :attribute field must not be empty.',
    email: 'E-mail must be a valid email address.',
    even: 'The value of the field must be even number.',
    status: 'Invalid status'
});

```

### Add custom messages

```javascript

//Note: Default language is English (en).

Validator.customMessages({
    'username.required': 'When username attribute required rule failed.',
    username: 'Default message for username attribute.'
});

```

### Add/Update rules default message in another language

Currenlty this package only support english, But you can easliy add messages in another language.

```javascript

Validator.messages({
    required: ':attribute ਫੀਲਡ ਖਾਲੀ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ.',
}, 'pb');

```

#### Set default language

```javascript

const validator = require('node-input-validator');
validator.setLang('pb');

```

### Add your own custom validation rules

```javascript

Validator.extend('even', async function (field, value) {

    if( (parseInt(value) % 2) == 0 ){
        return true;
    }

    return false;

});

Validator.extend('status', async function (field, value, args) {

    if( args.indexOf(value) >= 0 ){
        return true;
    }

    return false;

});

```

Some example of using database in rules

```javascript

// use this rules as unique:seed
// unique:<Mongoose Model>,<Field Name>,<ID to Ignore, This is optional>

const Validator = require('node-input-validator');
const mongoose = require('mongoose');

Validator.extend('unique', async function (field, value, args) {

// default field is email in this example
    let filed = args[1] || 'email';

    let condition = {};

    condition[filed] = value;

    // add ignore condition
    if (args[2]) {
        condition['_id'] = { $ne: mongoose.Types.ObjectId(args[2]) };
    }

    let emailExist = await mongoose.model(args[0]).findOne(condition).select(field);

    // email already exists
    if (emailExist) {
        return false;
    }

    return true;

});

// example usage of upper extended rule

new Validator({
    email: 'required|email|unique:User,email'
}, inputs);

// in case to ignore specific id

new Validator({
    email: 'required|email|unique:User,email,5c2f29e9cefa7718a54f8ff1'
}, inputs);

```

**For Koa2**
Attach koa middleware

```javascript

const validator = require('node-input-validator');

// keep this under your error handler
app.use(validator.koa());

```

Then in controller

```javascript

// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
    name:'required|maxLength:50',
    username:'required|maxLength:15',
    email:'required|email',
    password:'required'
});

// validation passes
// do some code

```

With custom inputs

```javascript

// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
    name:'required|maxLength:50',
    username:'required|maxLength:15',
    email:'required|email',
    password:'required'
}, ctx.request.body);

// validation passes
// do some code

```

With custom inputs and custom messages

```javascript

// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
    name:'required|maxLength:50',
    username:'required|maxLength:15',
    email:'required|email',
    password:'required'
}, ctx.request.body, {email: 'E-mail is required'});

// validation passes
// do some code

```

In case you wants control over validator, Then use

```javascript

// if validation fails, this will auto abort request with status code 422 and errors in body
const v = await ctx.validator({
    name:'required|maxLength:50',
    username:'required|maxLength:15',
    email:'required|email',
    password:'required'
});

// in case validation fails
if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
    return;
}

// do some code

```

This method (ctx.validator(rules,inputs={}, messages={})) also support same options as like ctx.validate

## Transform

You can transform a rule  to an object in order to manipulate better the information and then transform it to a rule of array strings that it's was the library stores.

### Transform to Object
The object will have the params as an array object and also a property that indicates if it's required.

```javascript

// Get possible rules
const transform = Validator.transform;

const v = ['between:1,2'];
const obj = transform.toObject(v);

```

And object will have this structure

```json

{
    params: [{
        'arguments': [{
            name: 'min',
            type: 'integer',
            value: 1
        },{
            name: 'max',
            type: 'integer',
            value: 2
        }
    ],
        'name': 'between',
        'types': ['integer'],
    }],
    required: false
};

```

### Transform to Array of strings

```javascript

// Get possible rules
const transform = Validator.transform;

const v = {
    params: [{
        'arguments': [{
            name: 'min',
            type: 'integer',
            value: 1
        },{
            name: 'max',
            type: 'integer',
            value: 2
        }
    ],
        'name': 'between',
        'types': ['integer'],
    }],
    required: false
};
const obj = transform.normalize(v);


```

And object will have this as a result

```

['between:1,2'];


```

## Rules

You can check test cases for rules usage/examples.

Rules definitions (with allowed parameters) can be fetched doing

```javascript

// Get possible rules
const rules = Validator.rules;

```

**required**
The field under validation cannot be left blank.

```javascript

// required rule validation fails
let v = new Validator({name:''}, {name:'required'});

```

**requiredIf:field,value**
The field under validation cannot be left blank, if provided seed value equals to provided value seed.

```javascript
// requiredIf rule validation fails, becoz email cannot be left blank if age is 16
let v = new Validator({email:'', age:'16'}, {email:'requiredIf:age,16'});
```

**requiredNotIf:field,value**
The field under validation may left blank, if provided seed value equals to provided value seed.

```javascript
// requiredNotIf rule validation fails, becoz transport must be present in case age is not 16
let v = new Validator({transport:'', age:'15'}, {transport:'requiredNotIf:age,16'});
```

**requiredWith:field**
**requiredWith:field,field,field**
 The field under validation may required in case provided seed present.

```javascript
// requiredWith rule validation fails, becoz email must in case age present.
let v = new Validator({email:'', age:'17'}, {email:'requiredWith:age'});
```

**requiredWithout:field**
**requiredWithout:field,field,field**
The field under validation may left blank in case provided seed present.

```javascript
// requiredWithout rule validation fails, becoz email is must in case phone,pan not provided.
let v = new Validator({email:'', username:''}, {email:'requiredWithout:phone,pan', username:'requiredWithout:email'});
```

**accepted**
The field under validation must be yes, on, 1, or true.

**acceptedIf:field,value**
The field under validation must be yes, on, 1, or true, if provided seed value equals to provided value seed.


**acceptedNotIf:field,value**
The field under validation must not be yes, on, 1, or true, if provided seed value equals to provided value seed.

**alpha**
The field under validation must be entirely alphabetic characters.

**alphaDash**
The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**alphaNumeric**
The field under validation only contains letters and numbers.

**array**
The field under validation must be an array.

**ascii**
The field under validation only contains ascii characters.

**base64**
The field under validation must be valid base64 encoded string.

**between:min,max**
The field under validation must be betwwen min and max seed. This will work with number valus as well as with arrays using array count.

**boolean**
**boolean:custom**
The field under validation must be boolean (true, false, 'true', 'false', 0, 1, '0', '1') or in custom seed.

**contains:value**
The field under validation must contains provided seeds.

```javascript
let v = new Validator({bio:'My profile is: example.com'}, {bio:'required|contains:profile'});
```

**creditCard**
The field under validation must be valid credit card string.

**date**
The field under validation must be a valid date (YYYY-MM-DD).

**after:YYYY-MM-DD**
The field under validation must be date after provided seed.

```javascript
let v = new Validator({joining:''}, {joining:'required|after:2018-02-10'});
```

**dateFormat:format**
The field under validation must match the given date format.

```javascript
let v = new Validator({dob:''}, {dob:'required|dateFormat:YYYY-MM-DD'});
```

Check https://momentjs.com/docs/ for supported formats

**decimal**
The field under validation must be a decimal value.

**digits:length**
The field under validation must be numeric and must have an exact length.

**digitsBetween:min,max**
The field under validation must have a length between provided min and max values.

```javascript
let v = new Validator({phone:''}, {age:'required|digitsBetween:10,13'});
```

**domain**
The field under validation must a qualified domain.

**email**
The field under validation must be formatted as an e-mail address.

**equals**
The field under validation must be equal to given value.

**hash:algo**
The field under validation must be a valid hash as per provided seed.

```javascript
 let v = new Validator({
        id: 'fd1baf48377a9f644f9af89abbee29f6'
     },
     {
         id: 'required|hash:md5'
     });

```

Supported algorithms: md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.

**hex**
The field under validation must be valid hex.

**hexColor**
The field under validation must be valid hex color code.

**iban**
The field under validation must a valid iban format.

**ifThisDateIs:operation,field**
The date field under validation must be {operation} than the related date field.
Note: Check operation section below.

**in:a,b...n**
The field under validation must exist in the given list of values.

```javascript
let v = new Validator({status:''}, {status:'required|in:active,inactive,blocked'});
```

**integer**
The field under validation must be an integer.

**ip**
The field under validation must be an IP address.

**iso8601**
The field under validation must be valid Iso8601 date.

**json**
The field under validation must be a valid JSON string.

**latLong**
The field under validation must be a valid latitude-longitude coordinate.

**lengthBetween:min,max**
The field under validation value length must be between provided values.

```javascript
let v = new Validator({age:''}, {age:'required|between:17,30'});
```

**macAddress**
The field under validation should be a valid Mac Address.

```javascript
let v = new Validator({ id: '00:14:22:01:23:45' }, { id: 'required|macAddress' });
;
```

**max**
The field under validation must be less than given value.

```javascript
let v = new Validator({age:''}, {age:'required|max:35'});
```

**maxLength**
The length of field under validation should be less than given value.

```javascript
let v = new Validator({username:''}, {username:'required|max:10'});
```

**mime**
The file under validation must have a MIME type corresponding to one of the listed extensions.

**min**
The field under validation must be greater than given value.

```javascript
let v = new Validator({age:''}, {age:'required|min:21'});
```

**minLength**
The length of field under validation should be greater than given value.

```javascript
let v = new Validator({username:''}, {username:'required|max:10|min:5'});
```

**mongoId**
The field under validation should be a valid MongoDB ID.

```javascript
let v = new Validator({id:''}, {id:'required|mongoId'});
```

**notContains:value**
The field under validation may not contains provided seeds.

**notIn**
The field under validation must not exist in the given list of values.

```javascript
let v = new Validator({status:''}, {status:'required|notIn:inactive,blocked'});
```

**numeric**
The field under validation must be numeric.

**percentageIfThisNumberIs:operation,percentage,field**
The numeric field under validation must be {operation} than given percentageo of the related numeric field.
Note: Check operation section below.

**phoneNumber**
The field under validation must be a valid phone number.

**regex**
The field under validation must match the given regular expression.

**same**
The given field must match the field under validation.

```javascript
let v = new Validator({password:''}, {password:'required|same:confirm_password'});
```

**sometimes**
The field under validation is required if present.

**string**
The field under validation must be string.

**url**
The field under validation must be a valid URL.

**yoBiggerThan:years**
The date field under validation must be older (in years) than the given years.
Note: Check operation section below.

**Post Rules**
There is set of rules which can be used to validate constraints of whole input, rather than validity of singular fields.

```javascript
const v = require('node-input-validator');

let validator = new v({name:''}, {'*': 'any:name,surname'});

validator.check().then(function (matched) {
    console.log(matched);
    console.log(validator.errors);
});
```

Post validator errors are returned in the `*` key. There is also possibility to add custom function as validator
with help of `addPostRule` method. Function will be called in context of validator object with input as parameter.

```javascript
const v = require('node-input-validator');

let v = new Validator({username: 'arnold', password: 'arnold123'}, {});

v.addPostRule(async function(input) {

    if (input.password.indexOf(input.username) >= 0) {
        this.validator.addError('password', 'custom', 'Password cannot contain username');
    }

});

```

**any**
Any of the fields must be present in input.

**all**
All of the fields must be present in input.

**{operation}**
The operation parameters allows to the next comparison operators:
 - '<': Lower than.
 - '>': Bigger than.
 - '<=': Lower or equal than.
 - '>=': Bigger or equal than.
 - '=', '==', '===': Equal.

### Typescript Support

Typings expermental
