[node-input-validator](../README.md) › [Globals](../globals.md) › ["date/date-fns.adapter"](../modules/_date_date_fns_adapter_.md) › [DateFnsAdapter](_date_date_fns_adapter_.datefnsadapter.md)

# Class: DateFnsAdapter

## Hierarchy

* [DateAdapter](_date_contracts_.dateadapter.md)

  ↳ **DateFnsAdapter**

## Index

### Constructors

* [constructor](_date_date_fns_adapter_.datefnsadapter.md#constructor)

### Properties

* [dateLib](_date_date_fns_adapter_.datefnsadapter.md#protected-datelib)
* [FORMAT_yyyy_MM_dd](_date_date_fns_adapter_.datefnsadapter.md#static-format_yyyy_mm_dd)

### Methods

* [addDays](_date_date_fns_adapter_.datefnsadapter.md#adddays)
* [format](_date_date_fns_adapter_.datefnsadapter.md#format)
* [isAfter](_date_date_fns_adapter_.datefnsadapter.md#isafter)
* [isBefore](_date_date_fns_adapter_.datefnsadapter.md#isbefore)
* [isValidDateFormat](_date_date_fns_adapter_.datefnsadapter.md#isvaliddateformat)
* [isValidIsoDateFormat](_date_date_fns_adapter_.datefnsadapter.md#isvalidisodateformat)
* [parse](_date_date_fns_adapter_.datefnsadapter.md#parse)
* [parseDate](_date_date_fns_adapter_.datefnsadapter.md#parsedate)
* [subDays](_date_date_fns_adapter_.datefnsadapter.md#subdays)

## Constructors

###  constructor

\+ **new DateFnsAdapter**(`dateLib`: any): *[DateFnsAdapter](_date_date_fns_adapter_.datefnsadapter.md)*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[constructor](_date_contracts_.dateadapter.md#constructor)*

*Defined in [date/date-fns.adapter.ts:5](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`dateLib` | any |

**Returns:** *[DateFnsAdapter](_date_date_fns_adapter_.datefnsadapter.md)*

## Properties

### `Protected` dateLib

• **dateLib**: *any*

*Defined in [date/date-fns.adapter.ts:4](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L4)*

*Defined in [date/contracts.ts:12](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/contracts.ts#L12)*

___

### `Static` FORMAT_yyyy_MM_dd

▪ **FORMAT_yyyy_MM_dd**: *string* = "yyyy-MM-dd"

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[FORMAT_yyyy_MM_dd](_date_contracts_.dateadapter.md#static-format_yyyy_mm_dd)*

*Defined in [date/date-fns.adapter.ts:5](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L5)*

## Methods

###  addDays

▸ **addDays**(`date`: Date, `days`: number): *Date*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[addDays](_date_contracts_.dateadapter.md#abstract-adddays)*

*Defined in [date/date-fns.adapter.ts:27](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`days` | number |

**Returns:** *Date*

___

###  format

▸ **format**(`date`: Date, `format`: string): *string*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[format](_date_contracts_.dateadapter.md#abstract-format)*

*Defined in [date/date-fns.adapter.ts:62](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`format` | string |

**Returns:** *string*

___

###  isAfter

▸ **isAfter**(`format`: string, `date`: Date | number | string, `dateToCompare`: Date | number | string): *boolean*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[isAfter](_date_contracts_.dateadapter.md#abstract-isafter)*

*Defined in [date/date-fns.adapter.ts:11](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`format` | string |
`date` | Date &#124; number &#124; string |
`dateToCompare` | Date &#124; number &#124; string |

**Returns:** *boolean*

___

###  isBefore

▸ **isBefore**(`format`: string, `date`: Date | number | string, `dateToCompare`: Date | number | string): *boolean*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[isBefore](_date_contracts_.dateadapter.md#abstract-isbefore)*

*Defined in [date/date-fns.adapter.ts:19](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`format` | string |
`date` | Date &#124; number &#124; string |
`dateToCompare` | Date &#124; number &#124; string |

**Returns:** *boolean*

___

###  isValidDateFormat

▸ **isValidDateFormat**(`date`: string, `format`: string): *boolean*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[isValidDateFormat](_date_contracts_.dateadapter.md#abstract-isvaliddateformat)*

*Defined in [date/date-fns.adapter.ts:54](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |
`format` | string |

**Returns:** *boolean*

___

###  isValidIsoDateFormat

▸ **isValidIsoDateFormat**(`date`: string): *boolean*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[isValidIsoDateFormat](_date_contracts_.dateadapter.md#abstract-isvalidisodateformat)*

*Defined in [date/date-fns.adapter.ts:58](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |

**Returns:** *boolean*

___

###  parse

▸ **parse**(`date`: string, `format`: string, `referenceDate`: Date): *Date*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[parse](_date_contracts_.dateadapter.md#abstract-parse)*

*Defined in [date/date-fns.adapter.ts:50](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |
`format` | string |
`referenceDate` | Date |

**Returns:** *Date*

___

###  parseDate

▸ **parseDate**(`date`: Date | string | number, `format`: string): *Date*

*Defined in [date/date-fns.adapter.ts:35](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date &#124; string &#124; number |
`format` | string |

**Returns:** *Date*

___

###  subDays

▸ **subDays**(`date`: Date, `days`: number): *Date*

*Overrides [DateAdapter](_date_contracts_.dateadapter.md).[subDays](_date_contracts_.dateadapter.md#abstract-subdays)*

*Defined in [date/date-fns.adapter.ts:31](https://github.com/bitnbytesio/node-input-validator/blob/952f4ba/src/date/date-fns.adapter.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`days` | number |

**Returns:** *Date*
