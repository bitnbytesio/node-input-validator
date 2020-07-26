[node-input-validator](../README.md) › [Globals](../globals.md) › ["rules/between.rule"](_rules_between_rule_.md)

# Module: "rules/between.rule"

## Index

### Functions

* [between](_rules_between_rule_.md#between)

## Functions

###  between

▸ **between**(`args`: Array‹string›): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/between.rule.ts:11](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/rules/between.rule.ts#L11)*

The field under validation must be between min and max seed.
This will work with number as well as array.
In case of array, array values must be numbers between min and max seed.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Array‹string› | seeds  |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*
