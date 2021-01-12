# NIV (Node Input Validator)

NIV (Node Input Validator) is a validation library for node.js. You can also extend library to add custom rules.

**Note**: For use case of any rule, please check test cases, If you have any doubt or confusion with documentation or regarding rule behaviour.

## Installation

```shell
npm i node-input-validator@v5
```

## Documentation
For detailed documentation, [see https://bitnbytes.io/docs/niv/index.html](https://bitnbytes.io/docs/niv/index.html)

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

## Rules

For rules documentation, [see https://bitnbytes.io/docs/niv/modules/rules.html](https://bitnbytes.io/docs/niv/modules/rules.html)
