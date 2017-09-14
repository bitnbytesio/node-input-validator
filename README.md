# Validation Library
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
