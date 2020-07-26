[node-input-validator](../README.md) › [Globals](../globals.md) › ["utils/obj.util"](_utils_obj_util_.md)

# Module: "utils/obj.util"

## Index

### Interfaces

* [NotationLoopOptions](../interfaces/_utils_obj_util_.notationloopoptions.md)

### Functions

* [getKeyValue](_utils_obj_util_.md#getkeyvalue)
* [getValueByStringNotation](_utils_obj_util_.md#getvaluebystringnotation)
* [getValuesByWildCardStringNotation](_utils_obj_util_.md#getvaluesbywildcardstringnotation)
* [isIterable](_utils_obj_util_.md#isiterable)
* [namedArgs](_utils_obj_util_.md#namedargs)

## Functions

###  getKeyValue

▸ **getKeyValue**(`key`: string): *(Anonymous function)*

*Defined in [utils/obj.util.ts:1](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.util.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *(Anonymous function)*

___

###  getValueByStringNotation

▸ **getValueByStringNotation**(`object`: any, `notation`: string): *string*

*Defined in [utils/obj.util.ts:22](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.util.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |
`notation` | string |

**Returns:** *string*

___

###  getValuesByWildCardStringNotation

▸ **getValuesByWildCardStringNotation**(`iterable`: any, `options`: [NotationLoopOptions](../interfaces/_utils_obj_util_.notationloopoptions.md)): *object*

*Defined in [utils/obj.util.ts:54](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.util.ts#L54)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`iterable` | any | - |
`options` | [NotationLoopOptions](../interfaces/_utils_obj_util_.notationloopoptions.md) | {} |

**Returns:** *object*

* **notationMap**: *any*

* **notationsVals**: *any*

___

###  isIterable

▸ **isIterable**(`object`: any): *boolean*

*Defined in [utils/obj.util.ts:42](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.util.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |

**Returns:** *boolean*

___

###  namedArgs

▸ **namedArgs**(`params`: Array‹string›): *object*

*Defined in [utils/obj.util.ts:5](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/utils/obj.util.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | Array‹string› |

**Returns:** *object*
