# NIV (Node Input Validator)

NIV (Node Input Validator) is a validation library for node.js. You can also extend library to add custom rules.

**Note**: For use case of any rule, please check test cases, If you have any doubt or confusion with documentation or regarding rule behaviour.

## Installation

```shell
npm i node-input-validator@v5
```

## Features

- typescript compatible
- large collection of rules
- add your own custom rules
- supports nested inputs
- declare rules as strings or array
- post validation rules
- modify or add new messages in your own language
- change attribute names globally or locally
- current supported languages: English, Persian(farsi)

## Usage

- [basic](#basic-example)  
- [koa middleware](#for-koa2)  
- [with express](#with-express)  
- [object validation examples](#objects-validation)  
- [array validation examples](#array-validation)  
- [add/modify messages](#add-or-modify-messages)  
- [change default language examples](#set-default-language)  
- [toggle multiple errors](#toggle-multiple-errors-support)  
- [change attribute names in messages examples](#set-attribute-nicecustom-name)  
- [add custom rules](#add-your-own-custom-validation-rules)  
- [rules](#rules)  

### Basic Example  

#### js

```javascript
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  { name: '' },
  { name: [Rules.required(), Rules.alpha()] },
);

v.validate().then(function (passed) {
  console.log(passed);
  console.log(v.errors);
});
```

#### async/await

```javascript
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  { name: '' },
  { name: [Rules.required(), Rules.alpha()] },
);

const passed = await v.validate()
console.log(passed);
console.log(v.errors);
```

#### laravel like rules

```javascript
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  { name: '' },
  { name: 'required|alpha' },
);

const passed = await v.validate()
console.log(passed);
console.log(v.errors);
```

#### ts

```ts
import { Validator, Rules } from 'node-input-validator';

const v: Validator = new Validator(
  { name: '' },
  { name: [Rules.required()] },
);

const passed: boolean = await v.validate();

console.log(passed);
console.log(v.errors);
```

### For Koa2

#### Attach koa middleware

```javascript
const niv = require('node-input-validator');

// keep this under your error handler
app.use(niv.koa());
```

#### Then in controller

```javascript
// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
  name: 'required|maxLength:50',
  username: 'required|maxLength:15',
  email: 'required|email',
  password: 'required'
});

// validation passes
// do some code
```

#### With custom inputs

```javascript
// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
  name: 'required|maxLength:50',
  username: 'required|maxLength:15',
  email: 'required|email',
  password: 'required'
}, ctx.request.body);

// validation passes
// do some code
```

#### With custom inputs and custom messages

```javascript
// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
  name: 'required|maxLength:50',
  username: 'required|maxLength:15',
  email: 'required|email',
  password: 'required'
}, ctx.request.body, { email: 'E-mail is required' });

// validation passes
// do some code
```

#### In case you wants control over validator, Then use

```javascript
// if validation fails, this will auto abort request with status code 422 and errors in body
const v = await ctx.validator(ctx.request.body, {
  name: 'required|maxLength:50',
  username: 'required|maxLength:15',
  email: 'required|email',
  password: 'required'
});

// in case validation fails
if (v.fails()) {
  ctx.status = 422;
  ctx.body = v.errors;
  return;
}

// do some code
```

### with express

```javascript
const { Validator } = require('node-input-validator');

app.post('login', function (req, res) {
  const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required'
  });

  v.validate().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
  });
});
```

### Objects Validation

#### Example 1

```javascript
const v = new Validator(
  {
    product: {
      id: '1',
      name: '',
      price: '',
      active: 'yes',
    }
  },
  {
    'product': 'required|object',
    'product.id': 'required|integer',
    'product.name': 'required',
    'product.price': 'required|integer',
    'product.active': 'required|integer'
  },
);

const matched = await v.validate();
```

### Array Validation

#### Example 1

```javascript
let v = new Validator(
  {
    roles: ['admin', 'manager', 'member']
  },
  {
    'roles': 'required|array',
    'roles.*': 'required|string'
  },
);

let matched = await v.check();
```

#### Example 2

```javascript
let v = new Validator(
  {
    plans: [
      { price: '25', title: 'OK' },
      { price: '', title: '' },
      { price: '30' },
      { price: '', title: 'Title' }
    ]
  },
  {
    'plans': 'required|array',
    'plans.*.price': 'required|integer',
    'plans.*.title': 'required'
  },
);
let matched = await v.check();
```

## Rules

You can declare rules in string or in array

**accepted**  
The field under validation must be yes, on, 1, or true.

```javascript
new Validator(
  inputs,
  { terms: 'accepted' },
);
```

Customize: will only allow 1 ("1" should be string)

```javascript
new Validator(
  inputs,
  { terms: 'accepted:1' },
);
```

in array example

```javascript
new Validator(
  inputs,
  { terms: [Rules.accepted()] },
);
```

Customise in array style

```javascript
new Validator(
  inputs,
  { terms: [Rules.accepted(['1'])] },
);
```

**alpha**  
The field under validation must be entirely alphabetic characters.

**alphaDash**  
The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**alphaNumeric**  
The field under validation only contains letters and numbers.

**array**  
The field under validation must be an array.

**arrayUnique**  
<sub>Added in: v3.5</sub>  
The field under validation must be an array and must contains unique values. No need to use array rule. This rule will take care of that.

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

**decimal**  
The field under validation must be a decimal value.

**digits:length**  
The field under validation must be numeric and must have an exact length.

**domain**  
The field under validation must a qualified domain.

**email**  
The field under validation must be formatted as an e-mail address.

**equals**  
The field under validation must be equal to given value.

**gt:another_field**  
<sub>Added in: v3.4</sub>  
The field under validation must be greater then another field value. This rule is for Numbers comparision.

**gte:another_field**  
<sub>Added in: v3.4</sub>  
The field under validation must be greater or equals to another field value. This rule is for Numbers comparision.

**hash:algo**  
The field under validation must be a valid hash as per provided seed.

```javascript
new Validator(
  {
    id: 'fd1baf48377a9f644f9af89abbee29f6'
  },
  {
    id: 'required|hash:md5'
  },
);
```

Supported algorithms: md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.

**hex**  
The field under validation must be valid hex.

**hexColor**  
The field under validation must be valid hex color code.

**in:a,b...n**  
The field under validation must exist in the given list of values.

```javascript
new Validator(
  { status: '' },
  { status: 'required|in:active,inactive,blocked' },
);
```

**integer**  
The field under validation must be an integer.

**ip**  
The field under validation must be an IP address.

**json**  
The field under validation must be a valid JSON string.

**latLong**  
The field under validation must be a valid latitude-longitude coordinate

**lt:another_field**  
<sub>Added in: v3.4</sub>  
The field under validation must be less then another field value. This rule is for Numbers comparision.

**lte:another_field**  
<sub>Added in: v3.4</sub>  
The field under validation must be less or equals to another field value. This rule is for Numbers comparision.

**macAddress**  
The field under validation should be a valid Mac Address.

**max:seed**  
The field under validation must be less than given value.

```javascript
new Validator(
  { age: '' },
  { age: 'required|max:35' },
);
```

**maxLength:seed**  
The length of field under validation should be less than given value.

```javascript
new Validator(
  { username: '' },
  { username: 'required|max:10' },
);
```

**min**  
The field under validation must be greater than given value.

**minLength**  
The length of field under validation should be greater than given value.

**mongoId**  
The field under validation should be a valid MongoDB ID.

**notContains:seed**  
The field under validation may not contains provided seeds.

**notIn:seeds**  
The field under validation must not exist in the given list of values.

**numeric**  
The field under validation must be numeric.

**phoneNumber**  
The field under validation must be a valid phone number.

**regex**  
The field under validation must match the given regular expression.

Note: Currently regex rules break on using colon (:) or pipe delimiters. Use array of rules style declaration instead of string.

```javascript
new Validator(
  req.body,
  { username: ['required', 'regex:[a-z]'] },
  { password: 'required|same:confirm_password' },
);
```

**same**  
The given field must match the field under validation.

**string**  
The field under validation must be string.

**url**  
The field under validation must be a valid URL.
