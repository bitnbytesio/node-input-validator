[node-input-validator](../README.md) › [Globals](../globals.md) › ["validator"](../modules/_validator_.md) › [Validator](_validator_.validator.md)

# Class: Validator

## Hierarchy

* **Validator**

## Index

### Constructors

* [constructor](_validator_.validator.md#constructor)

### Properties

* [customMessages](_validator_.validator.md#private-custommessages)
* [errors](_validator_.validator.md#errors)
* [hasCustomMessages](_validator_.validator.md#hascustommessages)
* [hasNestedRules](_validator_.validator.md#hasnestedrules)
* [inputs](_validator_.validator.md#private-inputs)
* [niceNames](_validator_.validator.md#nicenames)
* [notationMap](_validator_.validator.md#notationmap)
* [notationVals](_validator_.validator.md#notationvals)
* [parsedRulesCollection](_validator_.validator.md#parsedrulescollection)
* [rules](_validator_.validator.md#private-rules)

### Methods

* [applyFilters](_validator_.validator.md#applyfilters)
* [applyPostRules](_validator_.validator.md#applypostrules)
* [attributeValue](_validator_.validator.md#attributevalue)
* [createAttributeError](_validator_.validator.md#createattributeerror)
* [createAttributeErrorMessage](_validator_.validator.md#createattributeerrormessage)
* [dateAdapter](_validator_.validator.md#dateadapter)
* [doAttributeHasValue](_validator_.validator.md#doattributehasvalue)
* [getErrors](_validator_.validator.md#geterrors)
* [hasErrors](_validator_.validator.md#haserrors)
* [isAttributePresent](_validator_.validator.md#isattributepresent)
* [parse](_validator_.validator.md#parse)
* [parseInputs](_validator_.validator.md#parseinputs)
* [parseRules](_validator_.validator.md#parserules)
* [parseStringNotationRules](_validator_.validator.md#parsestringnotationrules)
* [validate](_validator_.validator.md#validate)
* [validateAttribute](_validator_.validator.md#validateattribute)

## Constructors

###  constructor

\+ **new Validator**(`inputs`: any, `rules`: [ValidationRulesContract](../interfaces/_contracts_.validationrulescontract.md) | [ValidationRuleStringNotationContract](../interfaces/_contracts_.validationrulestringnotationcontract.md), `customMessages`: [MessagesContract](../interfaces/_contracts_.messagescontract.md)): *[Validator](_validator_.validator.md)*

*Defined in [validator.ts:55](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L55)*

init validator

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`inputs` | any | - | - |
`rules` | [ValidationRulesContract](../interfaces/_contracts_.validationrulescontract.md) &#124; [ValidationRuleStringNotationContract](../interfaces/_contracts_.validationrulestringnotationcontract.md) | {} | - |
`customMessages` | [MessagesContract](../interfaces/_contracts_.messagescontract.md) | {} |   |

**Returns:** *[Validator](_validator_.validator.md)*

## Properties

### `Private` customMessages

• **customMessages**: *[MessagesContract](../interfaces/_contracts_.messagescontract.md)*

*Defined in [validator.ts:68](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L68)*

___

###  errors

• **errors**: *[ValidatorErrorContract](../interfaces/_contracts_.validatorerrorcontract.md)*

*Defined in [validator.ts:40](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L40)*

___

###  hasCustomMessages

• **hasCustomMessages**: *boolean* = false

*Defined in [validator.ts:46](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L46)*

___

###  hasNestedRules

• **hasNestedRules**: *boolean* = false

*Defined in [validator.ts:52](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L52)*

___

### `Private` inputs

• **inputs**: *any*

*Defined in [validator.ts:64](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L64)*

___

###  niceNames

• **niceNames**: *[NiceNamesContract](../interfaces/_contracts_.nicenamescontract.md)*

*Defined in [validator.ts:43](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L43)*

___

###  notationMap

• **notationMap**: *any*

*Defined in [validator.ts:48](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L48)*

___

###  notationVals

• **notationVals**: *any*

*Defined in [validator.ts:49](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L49)*

___

###  parsedRulesCollection

• **parsedRulesCollection**: *[ValidationRulesContract](../interfaces/_contracts_.validationrulescontract.md)*

*Defined in [validator.ts:55](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L55)*

___

### `Private` rules

• **rules**: *[ValidationRulesContract](../interfaces/_contracts_.validationrulescontract.md) | [ValidationRuleStringNotationContract](../interfaces/_contracts_.validationrulestringnotationcontract.md)*

*Defined in [validator.ts:65](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L65)*

## Methods

###  applyFilters

▸ **applyFilters**(`filters`: any): *void*

*Defined in [validator.ts:168](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L168)*

apply this set of filters to inputs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filters` | any | set of filters  |

**Returns:** *void*

___

###  applyPostRules

▸ **applyPostRules**(`rules`: any): *void*

*Defined in [validator.ts:176](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L176)*

apply post validation rules

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rules` | any | post rules  |

**Returns:** *void*

___

###  attributeValue

▸ **attributeValue**(`attr`: string): *any*

*Defined in [validator.ts:311](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L311)*

get attribute value by its name

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`attr` | string | attribute name  |

**Returns:** *any*

___

###  createAttributeError

▸ **createAttributeError**(`params`: [AttributeValidationMinimalInfo](../interfaces/_contracts_.attributevalidationminimalinfo.md)): *void*

*Defined in [validator.ts:244](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L244)*

this will create error object for attribute

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`params` | [AttributeValidationMinimalInfo](../interfaces/_contracts_.attributevalidationminimalinfo.md) | info object  |

**Returns:** *void*

___

###  createAttributeErrorMessage

▸ **createAttributeErrorMessage**(`params`: [AttributeValidationMinimalInfo](../interfaces/_contracts_.attributevalidationminimalinfo.md), `useDefaultMessage`: boolean): *string*

*Defined in [validator.ts:256](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L256)*

this will return parsed error message as per rule or input

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | [AttributeValidationMinimalInfo](../interfaces/_contracts_.attributevalidationminimalinfo.md) | - | object with attr and rule name, value, args  |
`useDefaultMessage` | boolean | true | - |

**Returns:** *string*

___

###  dateAdapter

▸ **dateAdapter**(): *[DateAdapter](_date_contracts_.dateadapter.md)*

*Defined in [validator.ts:349](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L349)*

**Returns:** *[DateAdapter](_date_contracts_.dateadapter.md)*

___

###  doAttributeHasValue

▸ **doAttributeHasValue**(`attr`: string): *boolean*

*Defined in [validator.ts:319](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L319)*

check if attribute has value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`attr` | string | attribute name  |

**Returns:** *boolean*

___

###  getErrors

▸ **getErrors**(): *any*

*Defined in [validator.ts:345](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L345)*

get validation errors

**Returns:** *any*

___

###  hasErrors

▸ **hasErrors**(): *boolean*

*Defined in [validator.ts:338](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L338)*

does we have any dirty/failed input

**Returns:** *boolean*

___

###  isAttributePresent

▸ **isAttributePresent**(`attr`: string): *boolean*

*Defined in [validator.ts:327](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L327)*

does attribute present in given inputs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`attr` | string | attribute name  |

**Returns:** *boolean*

___

###  parse

▸ **parse**(): *void*

*Defined in [validator.ts:77](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L77)*

parse provided rules and inputs

**Returns:** *void*

___

###  parseInputs

▸ **parseInputs**(): *void*

*Defined in [validator.ts:139](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L139)*

**Returns:** *void*

___

###  parseRules

▸ **parseRules**(): *void*

*Defined in [validator.ts:82](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L82)*

**Returns:** *void*

___

###  parseStringNotationRules

▸ **parseStringNotationRules**(`attrRules`: string): *Array‹[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)›*

*Defined in [validator.ts:110](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L110)*

parse rules those are in string notation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`attrRules` | string | attribute string rules  |

**Returns:** *Array‹[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)›*

___

###  validate

▸ **validate**(): *Promise‹boolean›*

*Defined in [validator.ts:183](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L183)*

validate inputs againest rules

**Returns:** *Promise‹boolean›*

___

###  validateAttribute

▸ **validateAttribute**(`attrName`: string, `attrRules`: Array‹[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)›): *void*

*Defined in [validator.ts:206](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/validator.ts#L206)*

apply rules on attribute

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`attrName` | string | attribute name |
`attrRules` | Array‹[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)› | attribute rules  |

**Returns:** *void*
