Validation Library
==================
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/github/artisangang/node-input-validator/badge.svg?branch=master)](https://coveralls.io/github/artisangang/node-input-validator?branch=master)
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



Validation library for node.js


Node Input Validator is a validation library for node.js. You can also extend library to add custom rules.

**Installation**

```npm install node-input-validator```

**Usage**
```javascript
const v = require('node-input-validator');

let r = {};   // first argument for constructor will always be blank object 
              // This empty object (i.e. r in this case) will be used in future

let validator = new v(r, {name:''}, {name:'required|minLength:5'});

validator.check().then(function (matched) {
	console.log(matched);
	console.log(validator.errors);
});
```

**Extending**

```javascript

Validator.messages({
    even: 'The value of the field must be even number.',
    status: 'Invalid status'
});

Validator.extend('even', async function (field, value) {

    if( (parseInt(value) % 2) == 0 ){
		return true;
    } 
    
    this.validator.addError(field, 'even');
    return false;

});

Validator.extend('status', async function (field, value, args) {

    if( args.indexOf(value) >= 0 ){
		return true;
    }
    
    this.validator.addError(field, 'status');
    return false;

});

```

**Extending/Overriding messages**
```javascript
Validator.messages({
    required: 'The :attribute field must not be empty.',
});
```

```javascript
validator.rules.validateCustom = async (field, value)  => {
	    	
    if( value === 'yes' || value === 'on' ){
        return true;
    }
    
    this.validator.addError(field, 'custom');
    return false;

};
```

**For Koa2**
Attach koa middleware
```javascript
const validator = require('node-input-validator');
app.use(validator.koa());
```
Controller Example
```javascript

let v = await ctx.validate(ctx.request.body, {
		name:'required|maxLength:50', 
		username:'required|maxLength:15',
		email:'required|email',
		password:'required'
	});


let isValid = await v.check();

if (!isValid) {
	// return validation errors
	ctx.body = v.errors;
}

```

**Object Type Fileds Validation**
```javascript
    let v = new Validator(r,
                {
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

**Array Type Fileds Validation**
```javascript
    let v = new Validator({},
                {
                    plan: [
                        {price:'25',title:'OK'},
                        {price:'',title:''},
                        {price:'30'},
                        {price:'',title:'Title'}
                    ]
                },
                {
                    'plan.*.price': 'required|integer',
                    'plan.*.title': 'required'
                });

    let matched = await v.check();
```    

**Rules**

You can check test cases for rules.

required  
requiredIf:age,16  
requiredNotIf:age,16  
requiredWith:age  
requiredWithout:age  

**accepted**  
The field under validation must be yes, on, 1, or true.

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

**between:1,9**  
The field under validation must be between provided values.

**boolean**  
The field under validation must be 0/1, or true/false.

**contains**  
The field under validation must contains provided seeds.

**creditCard**  
The field under validation must be valid credit card string.

**dateFormat**  
The field under validation must match the given date format.

**digits**  
The field under validation only contains digits.

**digitsBetween**  
The field under validation must be in between provided digit values.

**email**  
The field under validation must be formatted as an e-mail address.

**equals**  
The field under validation must be equal to given value.

**in**  
The field under validation must exist in the given list of values.

**integer**  
The field under validation must be an integer.

**ip**  
The field under validation must be an IP address.

**json**   
The field under validation must be a valid JSON string.

**latLong**   
The field under validation must be a valid latitude-longitude coordinate.

**max**  
The field under validation must be less than given value.

**mime**  
The file under validation must have a MIME type corresponding to one of the listed extensions.

**min**   
The field under validation must be greater than given value.

**maxLength**   
The length of field under validation should be less than given value.

**minLength**  
The length of field under validation  should be greater than given value.

**notIn**  
The field under validation must not exist in the given list of values.

**numeric**  
The field under validation must be numeric.

**regex**  
The field under validation must match the given regular expression.

**same**  
The given field must match the field under validation.

**size**  
The file field  under validation must have a file size matching the given maximum value or should be between file size range.

**string**  
The field under validation must be string.

**url**  
The field under validation must be a valid URL.

**Post Rules**

There is set of rules which can be used to validate constraints of whole input, rather than validity of singular fields.

*Usage*
```javascript
const v = require('node-input-validator');

let r = {};   // first argument for constructor will always be blank object 
              // This empty object (i.e. r in this case) will be used in future

let validator = new v(r, {name:''}, {'*': 'any:name,surname'});

validator.check().then(function (matched) {
    console.log(matched);
    console.log(validator.errors);
});
```

Post validator errors are returned in the `*` key. There is also possibility to add custom function as validator
with help of `addPostRule` method. Function will be called in context of validator object with input as parameter.

```javascript
const v = require('node-input-validator');

let r = {};   // first argument for constructor will always be blank object 
              // This empty object (i.e. r in this case) will be used in future

let v = new Validator(r, {username: 'arnold', password: 'arnold123'}, {});

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


 
