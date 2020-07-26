[node-input-validator](../README.md) › [Globals](../globals.md) › ["date/contracts"](../modules/_date_contracts_.md) › [DateAdapter](_date_contracts_.dateadapter.md)

# Class: DateAdapter

## Hierarchy

* **DateAdapter**

  ↳ [DateFnsAdapter](_date_date_fns_adapter_.datefnsadapter.md)

## Index

### Constructors

* [constructor](_date_contracts_.dateadapter.md#constructor)

### Properties

* [dateLib](_date_contracts_.dateadapter.md#protected-datelib)
* [FORMAT_yyyy_MM_dd](_date_contracts_.dateadapter.md#static-format_yyyy_mm_dd)

### Methods

* [addDays](_date_contracts_.dateadapter.md#abstract-adddays)
* [format](_date_contracts_.dateadapter.md#abstract-format)
* [isAfter](_date_contracts_.dateadapter.md#abstract-isafter)
* [isBefore](_date_contracts_.dateadapter.md#abstract-isbefore)
* [isValidDateFormat](_date_contracts_.dateadapter.md#abstract-isvaliddateformat)
* [isValidIsoDateFormat](_date_contracts_.dateadapter.md#abstract-isvalidisodateformat)
* [parse](_date_contracts_.dateadapter.md#abstract-parse)
* [subDays](_date_contracts_.dateadapter.md#abstract-subdays)

## Constructors

###  constructor

\+ **new DateAdapter**(`dateLib`: any): *[DateAdapter](_date_contracts_.dateadapter.md)*

*Defined in [date/contracts.ts:10](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`dateLib` | any |

**Returns:** *[DateAdapter](_date_contracts_.dateadapter.md)*

## Properties

### `Protected` dateLib

• **dateLib**: *any*

*Defined in [date/contracts.ts:12](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L12)*

___

### `Static` FORMAT_yyyy_MM_dd

▪ **FORMAT_yyyy_MM_dd**: *string* = "yyyy-MM-dd"

*Defined in [date/contracts.ts:10](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L10)*

## Methods

### `Abstract` addDays

▸ **addDays**(`date`: Date, `days`: number): *Date*

*Defined in [date/contracts.ts:17](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`days` | number |

**Returns:** *Date*

___

### `Abstract` format

▸ **format**(`date`: Date, `format`: string): *string*

*Defined in [date/contracts.ts:20](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`format` | string |

**Returns:** *string*

___

### `Abstract` isAfter

▸ **isAfter**(`format`: string, `date`: Date | number | string, `dateToCompare`: Date | number | string): *boolean*

*Defined in [date/contracts.ts:14](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`format` | string |
`date` | Date &#124; number &#124; string |
`dateToCompare` | Date &#124; number &#124; string |

**Returns:** *boolean*

___

### `Abstract` isBefore

▸ **isBefore**(`format`: string, `date`: Date | number | string, `dateToCompare`: Date | number | string): *boolean*

*Defined in [date/contracts.ts:15](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`format` | string |
`date` | Date &#124; number &#124; string |
`dateToCompare` | Date &#124; number &#124; string |

**Returns:** *boolean*

___

### `Abstract` isValidDateFormat

▸ **isValidDateFormat**(`date`: string, `format`: string): *boolean*

*Defined in [date/contracts.ts:21](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |
`format` | string |

**Returns:** *boolean*

___

### `Abstract` isValidIsoDateFormat

▸ **isValidIsoDateFormat**(`date`: string): *boolean*

*Defined in [date/contracts.ts:22](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |

**Returns:** *boolean*

___

### `Abstract` parse

▸ **parse**(`date`: string, `format`: string, `referenceDate`: Date): *Date*

*Defined in [date/contracts.ts:19](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |
`format` | string |
`referenceDate` | Date |

**Returns:** *Date*

___

### `Abstract` subDays

▸ **subDays**(`date`: Date, `days`: number): *Date*

*Defined in [date/contracts.ts:18](https://github.com/bitnbytesio/node-input-validator/blob/f6990fa/src/date/contracts.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`days` | number |

**Returns:** *Date*
