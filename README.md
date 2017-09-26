Validation Library
==================
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
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

**Note: Package is under development**


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
Validator.extend('even', async function (field, value, message) {

	if( (parseInt(value) % 2) == 0 ){
		return true;
    } else {
        this.validator.addError(field, 'even', message || 'The value of the field must be even number');
        return false;
    }

});

Validator.extend('status', async function (field, value, args, message) {

	if( args.indexOf(value) >= 0 ){
		return true;
    } else {
        this.validator.addError(field, 'status', message || 'Invalid status');
        return false;
    }

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
		name:'required|max:50', 
		username:'required|max:15',
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

accepted
alpha
alphaDash
alphaNumeric
between:1,9
boolean
contains
digits
digitsBetween
email
in
Integer
ip
array
json
max
min
maxLength
minLength
notIn
numeric
regex
same
string
url
