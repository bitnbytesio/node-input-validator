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
