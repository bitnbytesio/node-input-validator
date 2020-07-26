[node-input-validator](../README.md) › [Globals](../globals.md) › ["rules/array.rule"](_rules_array_rule_.md)

# Module: "rules/array.rule"

## Index

### Functions

* [array](_rules_array_rule_.md#array)
* [arrayLength](_rules_array_rule_.md#arraylength)
* [arrayUnique](_rules_array_rule_.md#arrayunique)
* [arrayUniqueObjects](_rules_array_rule_.md#arrayuniqueobjects)

## Functions

###  array

▸ **array**(): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/array.rule.ts:10](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/rules/array.rule.ts#L10)*

The field under validation must be array.

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

___

###  arrayLength

▸ **arrayLength**(`args`: Array‹string›): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/array.rule.ts:70](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/rules/array.rule.ts#L70)*

**`since:`** v5
The field under validation must be array of length as per seed.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Array‹string› | seeds  |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

___

###  arrayUnique

▸ **arrayUnique**(): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/array.rule.ts:23](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/rules/array.rule.ts#L23)*

The field under validation must be array of unique values.
No need to use array rule. This rule will take care of that.

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

___

###  arrayUniqueObjects

▸ **arrayUniqueObjects**(`args`: Array‹string›): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/array.rule.ts:41](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/rules/array.rule.ts#L41)*

The field under validation must be array and should have objects with unique attributes as per seed.
No need to use array rule. This rule will take care of that.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Array‹string› | seeds  |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*
