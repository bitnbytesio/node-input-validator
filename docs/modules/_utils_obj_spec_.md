[node-input-validator](../README.md) › [Globals](../globals.md) › ["utils/obj.spec"](_utils_obj_spec_.md)

# Module: "utils/obj.spec"

## Index

### Variables

* [inputs](_utils_obj_spec_.md#const-inputs)

### Object literals

* [inp](_utils_obj_spec_.md#const-inp)
* [inpf](_utils_obj_spec_.md#const-inpf)
* [input](_utils_obj_spec_.md#const-input)

## Variables

### `Const` inputs

• **inputs**: *any[]* = [input]

*Defined in [utils/obj.spec.ts:26](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L26)*

## Object literals

### `Const` inp

### ▪ **inp**: *object*

*Defined in [utils/obj.spec.ts:27](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L27)*

▪ **user**: *object*

*Defined in [utils/obj.spec.ts:28](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L28)*

* **address**: *object*

  * **contacts**: *object*

    * **phone**: *string* = "Test"

___

### `Const` inpf

### ▪ **inpf**: *object*

*Defined in [utils/obj.spec.ts:37](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L37)*

###  email

• **email**: *string* = "user@example.com"

*Defined in [utils/obj.spec.ts:39](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L39)*

###  name

• **name**: *string* = "username"

*Defined in [utils/obj.spec.ts:38](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L38)*

___

### `Const` input

### ▪ **input**: *object*

*Defined in [utils/obj.spec.ts:3](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L3)*

###  users

• **users**: *object | object[]* = [
    {
      name: "test",
      contacts: [{
        code: 13,
      }],
    },
    {
      name: "rest",
      contacts: [{
        code: 14,
        contactPerson: {
          name: "Contact Person",
        },
      }],
    },
  ]

*Defined in [utils/obj.spec.ts:7](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L7)*

▪ **event**: *object*

*Defined in [utils/obj.spec.ts:4](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.spec.ts#L4)*

* **name**: *string* = "event name"
