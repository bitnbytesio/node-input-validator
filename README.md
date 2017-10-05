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

let r = {};

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

Validator.extend('even', async function (field, value, message) {

	if( (parseInt(value) % 2) == 0 ){
		return true;
    } else {
        this.validator.addError(field, 'even');
        return false;
    }

});

Validator.extend('status', async function (field, value, args, message) {

	if( args.indexOf(value) >= 0 ){
		return true;
    } else {
        this.validator.addError(field, 'status');
        return false;
    }

});

```

**Extending/Overiding messages**
```javascript
Validator.messages({
    required: 'The :attribute field must not be empty.',
});
```

```javascript
validator.rules.validateCustom = async (field, value, message)  => {
	    	
    if( value === 'yes' || value === 'on' ){
        return true;
    }else{
        this.validator.addError(field, 'custom', message || 'The value of the field needs to be  yes or no');
        return false;
    }

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
he field under validation must be entirely alphabetic characters.

**alphaDash**  
The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**alphaNumeric**  
The field under validation only contains letters and numbers.

**array**  
The field under validation must be an array.

**ascii**  
The field under validation only contains ascii characters.

**base64**  
The field under validation must be valid base64 ecoded string.

**between:1,9**  
The field under validation must be between provided values.

**boolean**  
The field under validation must be 0/1, or true/false.

**contains**  
The field under validation must contains provided seeds.

**creditCard**  
The field under validation must be valid creadit card string.

**dateFormat**  
The field under validation must match the given date format.

**digits**  
The field under validation only contains digits.

**digitsBetween**  
The field under validation must be between provided digit values.

**email**  
The field under validation must be formatted as an e-mail address.

**Equals**  
The field under validation must be equal to given value.

**in**  
The field under validation must exist in the given list of values.

**Integer**  
The field under validation must be an integer.

**ip**  
The field under validation must be an IP address.

**json**   
The field under validation must be a valid JSON string.

**latLong**   
The field under validation must be a valid latitude-longitude coordinate.


**max**  
The field under validation must be less than givern value.

**mime**  
The file under validation must have a MIME type corresponding to one of the listed extensions.

**min**   
The field under validation must be greater than givern value.

**maxLength**   
The length of field under validation should be less than givern value.

**minLength**  
The length of field under validation  should be greater than givern value.

**notIn**  
The field under validation must not exist in the given list of values.

**numeric**  
The field under validation must be numeric.

**regex**  
The field under validation must match the given regular expression.

**same**  
The given field must match the field under validation.

**size**  
The field under validation must have a size matching the given value.

**string**  
The field under validation must be string.

**url**  
The field under validation must be a valid URL.
