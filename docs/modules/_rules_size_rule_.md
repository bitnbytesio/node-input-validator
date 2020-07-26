[node-input-validator](../README.md) › [Globals](../globals.md) › ["rules/size.rule"](_rules_size_rule_.md)

# Module: "rules/size.rule"

## Index

### Functions

* [bytesBetween](_rules_size_rule_.md#bytesbetween)
* [size](_rules_size_rule_.md#size)

## Functions

###  bytesBetween

▸ **bytesBetween**(`bytes`: number, `max`: number, `min`: Number): *boolean*

Defined in rules/size.rule.ts:15

check if bytes are within given range

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bytes` | number | bytes |
`max` | number | max bytes accepted |
`min` | Number | min bytes required |

**Returns:** *boolean*

___

###  size

▸ **size**(`args`: Array‹string›, `trust`: boolean): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

Defined in rules/size.rule.ts:38

The field under validation should be file path, Buffer or File object.

The file under validation size should be as per given max/min seed.

Size units: b (Bytes), kb/k (KiloBytes), mb/m (MegaBytes), gb/g (GigaBytes).

**`throws`** {Error} Invalid number of arguments

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`args` | Array‹string› | - | rule arguments |
`trust` | boolean | false | weather to trust size from file object or not |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*
