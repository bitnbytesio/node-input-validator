const types = {
    STRING: 'string',
    INTEGER: 'integer',
    BOOLEAN: 'boolean',
    DATE: 'date',
};
const ALL = Object.values(types);
const rules = [
    {
        name: 'accepted',
        arguments: [],
        description: 'The field under validation must be yes, on, 1, or true.',
        types: ALL,
    },
    {
        name: 'acceptedIf',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
            {
                type: 'string',
                name: 'reference value',
            },
        ],
        description: 'The field under validation must be accepted if the provided'
                        + 'field value is equals to provided value.',
        types: ALL,
    },
    {
        name: 'acceptedNotIf',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
            {
                type: 'string',
                name: 'reference value',
            },
        ],
        description: 'The field under validation must not be accepted if the provided'
                        + 'field value is equals to provided value..',
        types: ALL,
    },
    {
        name: 'alpha',
        arguments: [],
        description: 'The field under validation must be entirely alphabetic characters.',
        types: [types.STRING],
    },
    {
        name: 'alphaDash',
        arguments: [],
        description: 'The field under validation may have alpha-numeric characters, as well as dashes and underscores.',
        types: [types.STRING],
    },
    {
        name: 'alphaNumeric',
        arguments: [],
        description: 'The field under validation only contains letters and numbers.',
        types: [types.STRING],
    },
    {
        name: 'between',
        arguments: [
            {
                type: 'integer',
                name: 'min',
            },
            {
                type: 'integer',
                name: 'max',
            },
        ],
        description: 'The field under validation must be between min and max seed.',
        types: [types.INTEGER],
    },
    {
        name: 'boolean',
        arguments: [],
        description: 'The field under validation must be boolean.',
        types: [types.BOOLEAN],
    },
    {
        name: 'contains',
        arguments: [
            {
                type: 'string',
                name: 'contained string',
            },
        ],
        description: 'The field under validation must contains provided seeds.',
        types: [types.STRING],
    },
    {
        name: 'creditCard',
        arguments: [],
        description: 'The field under validation must be valid credit card string.',
        types: [types.STRING],
    },
    {
        name: 'dateFormat',
        arguments: [
            {
                type: 'enum',
                name: 'formatting',
                options: [
                    'YYYY',
                    'YYYY-MM',
                    'YYYY-MM-DD',
                    'YYYY-MM-DDThh:mmTZD',
                    'YYYY-MM-DDThh:mm:ssTZD',
                    'YYYY-MM-DDThh:mm:ss.sTZD',
                ],
            },
        ],
        description: 'The field under validation must match the given date format (ISO 8601).',
        types: [types.DATE, types.STRING],
    },
    {
        name: 'dateAfter',
        arguments: [
            {
                type: 'date',
                name: 'date',
            },
        ],
        description: 'The date under validation must be after the given date',
        types: [types.DATE],
    },
    {
        name: 'dateDaysAfterToday',
        arguments: [
            {
                type: 'integer',
                name: 'number of days',
            },
        ],
        description: 'The date under validation must be the given days after today',
        types: [types.DATE],
    },
    {
        name: 'dateYearsAfterToday',
        arguments: [
            {
                type: 'integer',
                name: 'number of years',
            },
        ],
        description: 'The date under validation must be the given years after today',
        types: [types.DATE],
    },
    {
        name: 'dateDaysBeforeToday',
        arguments: [
            {
                type: 'integer',
                name: 'number of days',
            },
        ],
        description: 'The date under validation must be the given days before today',
        types: [types.DATE],
    },
    {
        name: 'dateYearsBeforeToday',
        arguments: [
            {
                type: 'integer',
                name: 'number of years',
            },
        ],
        description: 'The date under validation must be the given years before today',
        types: [types.DATE],
    },
    {
        name: 'dateBefore',
        arguments: [
            {
                type: 'date',
                name: 'date',
            },
        ],
        description: 'The date under validation must be before the given date',
        types: [types.DATE],
    },
    {
        name: 'decimal',
        arguments: [],
        description: 'The field under validation must be a decimal value.',
        types: [types.INTEGER],
    },
    {
        name: 'digits',
        arguments: [
            {
                type: 'integer',
                name: 'length',
            },
        ],
        description: 'The field under validation must be numeric and must have an exact length.',
        types: [types.INTEGER],
    },
    {
        name: 'digitsBetween',
        arguments: [
            {
                type: 'integer',
                name: 'min length',
            },
            {
                type: 'integer',
                name: 'max length',
            },
        ],
        description: 'The field under validation must have a length between provided min and max values.',
        types: [types.INTEGER],
    },
    {
        name: 'domain',
        arguments: [],
        description: 'The field under validation must a qualified domain.',
        types: [types.STRING],
    },
    {
        name: 'email',
        arguments: [],
        description: 'The field under validation must be formatted as an e-mail address.',
        types: [types.STRING],
    },
    {
        name: 'equals',
        arguments: [
            {
                type: 'integer',
                name: 'number of digits',
            },
        ],
        description: 'The field under validation must be equal to given value.',
        types: ALL,
    },
    {
        name: 'ifThisDateIs',
        arguments: [
            {
                type: 'enum',
                name: 'comparison',
                options: [
                    '<',
                    '>',
                    '<=',
                    '>=',
                    '=',
                ],
            },
            {
                type: 'date',
                name: 'date',
            },
        ],
        description: ' ',
        types: [types.DATE],
    },
    {
        name: 'in',
        arguments: [
            {
                type: 'array',
                name: 'list of values',
            },
        ],
        description: 'The field under validation must exist in the given list of values.',
        types: ALL,
    },
    {
        name: 'integer',
        arguments: [],
        description: 'The field must be an integer.',
        types: [types.INTEGER],
    },
    {
        name: 'iso8601',
        arguments: [],
        description: 'The field under validation must be valid Iso8601 date.',
        types: [types.DATE],
    },
    {
        name: 'max',
        arguments: [
            {
                type: 'integer',
                name: 'max value',
            },
        ],
        description: 'The field under validation must be less than given value.',
        types: [types.INTEGER],
    },
    {
        name: 'min',
        arguments: [
            {
                type: 'integer',
                name: 'min value',
            },
        ],
        description: 'The field under validation must be greater than given value.',
        types: [types.INTEGER],
    },
    {
        name: 'notContains',
        arguments: [
            {
                type: 'string',
                name: 'contained string',
            },
        ],
        description: 'The field under validation may not contains provided seeds.',
        types: [types.STRING],
    },
    {
        name: 'notIn',
        arguments: [
            {
                type: 'array',
                name: 'list of values',
            },
        ],
        description: 'The field under validation must not exist in the given list of values.',
        types: ALL,
    },
    {
        name: 'numeric',
        arguments: [],
        description: 'The field must be numeric.',
        types: [types.INTEGER],
    },
    {
        name: 'percentageIfThisNumberIs',
        arguments: [
            {
                type: 'enum',
                name: 'comparison',
                options: [
                    '<',
                    '>',
                    '<=',
                    '>=',
                    '=',
                ],
            },
            {
                type: 'integer',
                name: 'percent',
            },
            {
                type: 'reference',
                name: 'input',
            },
        ],
        description: ' ',
        types: [types.INTEGER],
    },
    {
        name: 'object',
        arguments: [],
        description: 'The field must be an object.',
        types: [types.STRING],
    },
    {
        name: 'phoneNumber',
        arguments: [],
        description: 'The field under validation must be a valid phone number.',
        types: [types.STRING],
    },
    {
        name: 'regex',
        arguments: [
            {
                type: 'string',
                name: 'rule',
            },
        ],
        description: 'The field under validation must match the given regular expression.',
        types: [types.STRING],
    },
    {
        name: 'required',
        arguments: [],
        description: 'The field under validation cannot be left blank.',
        types: ALL,
    },
    {
        name: 'requiredIf',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
            {
                type: 'string',
                name: 'reference value',
            },
        ],
        description: 'The field under validation cannot be left blank, '
                     + 'if provided seed value equals to provided value seed.',
        types: ALL,
    },
    {
        name: 'requiredNoIf',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
            {
                type: 'string',
                name: 'reference value',
            },
        ],
        description: 'The field under validation may left blank, if provided seed value equals to provided value seed.',
        types: ALL,
    },
    {
        name: 'requiredWith',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
        ],
        description: 'The field under validation may required in case provided seed present.',
        types: ALL,
    },
    {
        name: 'requiredWithout',
        arguments: [
            {
                type: 'reference',
                name: 'input',
            },
        ],
        description: 'The field under validation may left blank in case provided seed present.',
        types: ALL,
    },
    {
        name: 'string',
        arguments: [],
        description: 'The field must be a string.',
        types: [types.STRING],
    },
    {
        name: 'url',
        arguments: [],
        description: 'The field under validation must be a valid URL.',
        types: [types.STRING],
    },
];

module.exports = { rules, types };
