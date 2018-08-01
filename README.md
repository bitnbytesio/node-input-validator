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

**Note:**  
Migrating from 1.2.2 to version 2x, just remove first param from validator constructor, ie. empty object.
*Breaking Changes*
Changes in behaviour of digits and digitsBetween 

**Installation**

```shell
npm install node-input-validator
```

**Usage**
```javascript
const v = require('node-input-validator');

let validator = new v({name:''}, {name:'required|minLength:5'});

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

```javascript
validator.rules.validateCustom = async (field, value)  => {
            
    if( value === 'yes' || value === 'on' ){
        return true;
    }
    
    this.validator.addError(field, 'custom');
    return false;

};
```

**Extending/Overriding messages**
```javascript
Validator.messages({
    required: 'The :attribute field must not be empty.',
});
```

**Extending/Overriding messages in another language**
```javascript
Validator.messages({
    required: ':attribute ਫੀਲਡ ਖਾਲੀ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ.',
}, 'pb');
```

**Set/Modify default language**
```javascript
const validator = require('node-input-validator');
validator.setLang('pb');
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

**Array Type Fileds Validation**
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
                    'plan.*.price': 'required|integer',
                    'plan.*.title': 'required'
                });

    let matched = await v.check();
```    

**Rules**

You can check test cases for rules usage/examples.

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

**after**  
The field under validation must be date after provided seed.
```javascript
let v = new Validator({joining:''}, {joining:'required|after:2018-02-10'});
```

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

**before**  
The field under validation must be date before provided seed.
```javascript
let v = new Validator({joining:''}, {joining:'required|before:2018-02-10'});
```

**lengthBetween:start,end**  
The field under validation value length must be between provided values.
```javascript
let v = new Validator({age:''}, {age:'required|between:17,30'});
```

**boolean**  
The field under validation must be 0/1, or true/false.

**contains**  
The field under validation must contains provided seeds.
```javascript
let v = new Validator({bio:''}, {bio:'required|contains:profile'});
```

**creditCard**  
The field under validation must be valid credit card string.

**dateFormat**  
The field under validation must match the given date format.
```javascript
let v = new Validator({dob:''}, {dob:'required|dateFormat:YYYY-MM-DD'});
```  
Check https://momentjs.com/docs/ for supported formats

**decimal**  
The field under validation must be decimal.

**digits:length**  
The field under validation must be numeric and must have an exact length of value.

**digitsBetween:min,max**  
The field under validation must have a length between provided min and max values.
```javascript
let v = new Validator({phone:''}, {age:'required|digitsBetween:10,13'});
```

**email**  
The field under validation must be formatted as an e-mail address.

**equals**  
The field under validation must be equal to given value.

**in**  
The field under validation must exist in the given list of values.
```javascript
let v = new Validator({status:''}, {status:'required|in:active,inactive,blocked'});
```

**integer**  
The field under validation must be an integer.

**ip**  
The field under validation must be an IP address.

**json**   
The field under validation must be a valid JSON string.

**latLong**   
The field under validation must be a valid latitude-longitude coordinate.

**mime**  
The file under validation must have a MIME type corresponding to one of the listed extensions.

**min**   
The field under validation must be greater than given value.
```javascript
let v = new Validator({age:''}, {age:'required|min:21'});
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

**minLength**  
The length of field under validation  should be greater than given value.
```javascript
let v = new Validator({username:''}, {username:'required|max:10|min:5'});
```

**notIn**  
The field under validation must not exist in the given list of values.
```javascript
let v = new Validator({status:''}, {status:'required|notIn:inactive,blocked'});
```
**notContains**  
The field under validation must not contains provided seeds.

**numeric**  
The field under validation must be numeric.

**regex**  
The field under validation must match the given regular expression.

**same**  
The given field must match the field under validation.
```javascript
let v = new Validator({password:''}, {password:'required|same:confirm_password'});
```

**size**  
The file field under validation must have a file size matching the given maximum value or should be between size range.
Supported unit sufix: b,kb/k,mb/m,gb/g.
```javascript
// in below case, image file size should be under 4kb limit
let v = new Validator({image:''}, {image:'required|size:4kb'});
```

```javascript
// in below case, image file size should be between 1kb - 4kb
let v = new Validator({image:''}, {image:'required|size:4kb,1kb'});
```

```javascript
let v = new Validator({video:''}, {video:'required|size:10mb'});
```

**string**  
The field under validation must be string.

**url**  
The field under validation must be a valid URL.

**Post Rules**

There is set of rules which can be used to validate constraints of whole input, rather than validity of singular fields.

*Usage*
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

#### Typescript Support
Typings expermental  