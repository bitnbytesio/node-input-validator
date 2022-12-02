# NIV (Node Input Validator)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![known vulnerabilities](https://snyk.io/test/npm/node-input-validator/badge.svg)](https://snyk.io/test/npm/node-input-validator)
[![codecov.io Status][codecov-img]][codecov-url]
![Libraries.io dependency status for specific release](https://img.shields.io/librariesio/release/npm/node-input-validator/5.0.0-beta.7)
[![node version][node-image]][node-url]

[travis-image]: https://travis-ci.com/bitnbytesio/node-input-validator.svg?branch=development
[travis-url]: https://travis-ci.com/bitnbytesio/node-input-validator

[codecov-img]: https://codecov.io/gh/bitnbytesio/node-input-validator/branch/development/graph/badge.svg
[codecov-url]: https://codecov.io/gh/bitnbytesio/node-input-validator/branch/development

[deps-image]:https://status.david-dm.org/gh/bitnbytesio/node-input-validator.svg?ref=development
[david-url]: https://david-dm.org/bitnbytesio/node-input-validator/development

[npm-image]: https://img.shields.io/npm/v/node-input-validator/beta?style=flat-square
[npm-url]: https://www.npmjs.com/package/node-input-validator/v/5.0.0-beta.6

[node-image]: https://img.shields.io/badge/node.js-%3E=_10.12-green.svg?style=flat-square
[node-url]: https://nodejs.org/en/download/

NIV (Node Input Validator) is a validation library for node.js. You can also extend library to add custom rules.

**Note**: For use case of any rule, please check test cases, If you have any doubt or confusion with documentation or regarding rule behaviour.

> There are some major changes in nested fields validations and some rules behaviour. Will update documentation soon.

> Post validations rules are broken

> Rules that depends on input attributes (like: requiredWith:attributeName), only works with concrete path (Correct:requiredWith:array.0.field, Wrong:requiredWith:array.*.field).

> Nested input children are only validated if have top level path rules declared in some cases
```js
// will pass
new Validator(
  { user: 'test' },
  {
     "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);

// will fail for user.address and user.address.city
new Validator(
  { user: 'test' },
  {
    'user.address': 'required|object',
    "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);

// will pass
new Validator(
  { user: {} },
  {
     user: 'required|object',
     "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);

// will fail dor user
new Validator(
  { user: 'test' },
  {
     user: 'required|object',
     "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);

// recommended, you can add or remove "required" rule as per your requirements
new Validator(
  { user: 'whatever the value is' },
  {
     user: 'required|object',
     'user.address': 'object',
     "user.address.city": [Rules.string(), Rules.alpha(), Rules.required()],
  },
);
```
**Suggestions welcomed, please open an issue you have one.**

## Installation

```shell
npm i node-input-validator@v5
```

This library supports both cjs and esm.

Using CJS
```js
const { Validator } = require('node-input-validator');
```

Using ESM
```js
import { Validator } from 'node-input-validator';
```

## Documentation
For detailed documentation, <a target="_blank" href="https://bitnbytes.io/docs/niv/index.html">see https://bitnbytes.io/docs/niv/index.html</a>

## New Features

> get inputs as per declared rules (added in v5.0.0-beta.6)
```js
const v = new Validator(inputs, rules);
const passed = await v.validate();
// only includes fields that are declared in rules
const data = v.data();
```

## Features

- typescript compatible
- large collection of rules
- add custom rules
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
- [object validation examples](#validate-objects)  
- [array validation examples](#validate-array)  
- [add custom rules](#add-custom-rules)  
- [add/modify messages](#add/modify-messages)  
- [change attribute names in messages examples](#set-nicenames)  
- [change default language examples](#set-default-language)  
- [toggle multiple errors](#toggle-multiple-errors-support)
- [rules](#rules)  

### Basic Example  

#### Vanila Javascript

##### Style 1

```js
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  { name: '' },
  { name: 'required|alpha' },
);

v.validate().then((passed) => {
  console.log(passed);

  if (!passed) {
    console.log(v.getErrors());
  }
});
```
##### Style 2

```js
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  { name: '' },
  { name: ['required', 'alpha'] },
);

v.validate().then(function (passed) {
  console.log(passed);
  console.log(v.errors);
});
```

##### Style 3

```js
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

#### Typescript

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

```js
const niv = require('node-input-validator');

// keep this under your error handler
app.use(niv.koa());
```

#### Then in controller

```js
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

```js
const cutomInputs = {...}

// if validation fails, this will auto abort request with status code 422 and errors in body
await ctx.validate({
  name: 'required|maxLength:50',
  username: 'required|maxLength:15',
  email: 'required|email',
  password: 'required'
}, cutomInputs);

// validation passes
// do some code
```

#### With custom inputs and custom messages

```js
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

```js
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

```js
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

### Validate objects

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

### Validate Array

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

const matched = await v.validate();
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

const matched = await v.validate();
```

## Add custom rules

```js
const niv = require('node-input-validator');

niv.extend('even', () => {
  return {
    name: 'even',
    handler: (v) => v % 2,
  }
});

// Add message for your rule
niv.Messages.extend({
  even: 'The :attr value must be an even number.',
  required: 'The attribute is required.',
})
```

## Add/Modify messages

```js
// modify existing rule message
niv.Messages.extend({
  required: 'The attribute is required.',
});

// add custom message on required rule for name
niv.Messages.addCustomMessages({
  'name.required': 'The name is required.',
});

// or no matter what the rule is use common message for name
niv.Messages.addCustomMessages({
  name: 'The name is malformed.',
});
```

## Set Nicenames

### Set nicenames globally

```js
// email in error message will be replaced with E-mail
niv.Messages.addNiceNames({
  email: 'E-mail',
});
```

### Set nicenames locally

```js
const { Validator } = require('node-input-validator');

const v = new Validator(
  {},
  {
    email: 'required|email',
  },
)

// this will only replace email with E-mail for error message of this instance
v.niceNames({
  email: 'E-mail',
});

v.validate()

```

## Date Rules

To use date rules, you has to install <a target="_blank" href="https://www.npmjs.com/package/moment">moment</a> or <a target="_blank" href="https://www.npmjs.com/package/date-fns">date-fns</a>

### For moment

```js
const { MomentAdapter, useDateAdapter  } = require('node-input-validator');
const moment = require('moment');

useDateAdapter(new MomentAdapter(moment));
```
### For date-fns

```js
const { DateFnsAdapter, useDateAdapter  } = require('node-input-validator');
const dateFns = require('date-fns');

useDateAdapter(new DateFnsAdapter(dateFns));
```

## using <a target="_blank" href="https://www.npmjs.com/package/validator">validator</a>

To use validator rules, first your need to install it

```bash
npm i validator
```

### Example 1

Then your can use all rules of validator.js as sub rule under rule validator.

```js
const { Validator } = require('node-input-validator');

const v = new Validator(
  {},
  {
    email: 'validator:isEmail',
  },
)

v.validate()

```

### Example 2

Passing arguments to validator.js rules, example passing locale to isAlpha rule.

```js
const { Validator } = require('node-input-validator');

const v = new Validator(
  req.body,
  {
    email: 'validator:isAlpha,pt-BR',
  },
)

v.validate()

```

### Example 3

```js
const { Validator, Rules } = require('node-input-validator');

const v = new Validator(
  req.body,
  {
    email: [Rules.validator('isAlpha', ['pt-BR'])],
  },
)

v.validate()

```

Note: You have to manually add messages for most validator.js rules.

### How package check messages for validator.js

Package internaly remove "is" from validator.js rule and make it lowercase.

For example: isEmail -> email, hence it can use existing email message.

## Rules

For rules documentation, <a href="https://bitnbytes.io/docs/niv/modules/rules.html" target="_blank">see https://bitnbytes.io/docs/niv/modules/rules.html</a>


**Many thanks**

- <a href="https://github.com/jgnovais">jgnovais</a>

## Roadblock
### v5.0.0-beta.5
- fillMissingSpots overwriting array value in nested inputs, eg. product.attributes.*.colors.*