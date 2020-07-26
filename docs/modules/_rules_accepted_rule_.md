[node-input-validator](../README.md) › [Globals](../globals.md) › ["rules/accepted.rule"](_rules_accepted_rule_.md)

# Module: "rules/accepted.rule"

## Index

### Functions

* [accepted](_rules_accepted_rule_.md#accepted)
* [acceptedIf](_rules_accepted_rule_.md#acceptedif)

## Functions

###  accepted

▸ **accepted**(`args`: Array‹string›): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/accepted.rule.ts:9](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/rules/accepted.rule.ts#L9)*

The field under validation must be yes, on, 1, or true.
This is useful for validating "Terms of Service" acceptance.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`args` | Array‹string› | ["true", "1", "yes", "on"] | seeds  |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

___

###  acceptedIf

▸ **acceptedIf**(`args`: Array‹string›, `acceptedValues`: Array‹string›): *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*

*Defined in [rules/accepted.rule.ts:24](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/rules/accepted.rule.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`args` | Array‹string› | - |
`acceptedValues` | Array‹string› | ["true", "1", "yes", "on"] |

**Returns:** *[ValidationRuleContract](../interfaces/_contracts_.validationrulecontract.md)*
