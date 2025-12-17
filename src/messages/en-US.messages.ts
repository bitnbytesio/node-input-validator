const after = 'The :attr must be a date after :arg0.';
const afterOrEqual = 'The :attr must be a date after or equal to :arg0.';
const before = 'The :attr must be a date before :arg0.';
const beforeOrEqual = 'The :attr must be a date before or equal to :date.';
const boolean = 'The :attr field must be boolean.';
const dateISO = 'The :attr must be a valid ISO-8601 date.';

export const messages = {
  after,
  afterOrEqual,
  before,
  beforeOrEqual,

  accepted: 'The :attr must be accepted.',
  acceptedIf: 'The :attr should be accepted if the parameter :arg0 is :arg1.',
  acceptedNotIf: 'The :attr cannot be accepted if the parameter :arg0 is :arg1.',
  activeUrl: 'The :attr is not a valid URL.',
  alpha: 'The :attr can only contain alphabets.',
  alphaDash: 'The :attr can only contain letters, numbers, and dashes.',
  alphaNumeric: 'The :attr can only contain letters and numbers.',
  alphaHyphen: 'The :attr can only contain letters and hyphens (-).',
  alphaNumericDash: 'The :attr can only contain letters, numbers, and dashes.',
  arrayLen: 'The :attr must be an array of length :arg0.',
  arrayLenRange: (params: any) => {
    if (params.ruleArgs.length == 1) {
      return 'The :attr must be an array with maximum length of :arg0.'
    }

    return 'The :attr must be an array of length between :arg0 and :arg1.'
  },
  arrayLenMin: 'The :attr must be an array with minimum length of :arg0.',
  arrayLenMax: 'The :attr must be an array with maximum length of :arg0.',
  array: 'The :attr must be an array.',
  arrayUnique: 'The :attr must be an array of unique values.',
  arrayUniqueObjects: 'The :attr must be an array of unique :args attributes of object.',
  ascii: 'The :attr can only contain valid ASCII characters.',
  base64: 'The :attr must be a valid base64 string.',
  between: 'The :attr must be between :arg0 and :arg1.',
  boolean,
  booleanStrict: boolean,
  booleanStr: boolean,
  booleanInt: boolean,
  confirmed: 'The :attr confirmation does not match.',
  contains: 'The :attr must contain :arg0.',
  creditCard: 'The :attr value must be a valid card number.',
  date: 'The :attr must be a valid date.',
  dateAfter: after,
  dateAfterToday: 'The :attr must be a date after :arg0 :arg1.',
  dateDaysAfterToday: 'The :attr must be a date after :arg0 days.',
  dateYearsAfterToday: 'The :attr must be a date after :arg0 years.',
  dateDaysBeforeToday: 'The :attr must be a date before :arg0 days.',
  dateYearsBeforeToday: 'The :attr must be a date before :arg0 years.',
  dateBefore: before,
  dateBeforeToday: 'The :attr must be a date before :arg0 :arg1.',
  dateFormat: 'The :attr does not match the date format :arg0.',
  datetime: 'The :attr must be a valid datetime (YYYY-MM-DD HH:mm:ss).',
  dateISO,
  dateiso: dateISO,
  decimal: 'The :attr must be a valid decimal value.',
  different: 'The :attr and :arg0 must be different.',
  digits: 'The :attr must be :arg0 digits.',
  digitsBetween: 'The :attr must be between :arg0 and :arg1 digits.',
  dimensions: 'The :attr must meet dimension constraints: :args.',
  domain: 'The :attr must be a valid domain.',
  email: 'The :attr must be a valid email address.',
  equals: 'The :attr must equal :arg0.',
  gt: 'The :attr must be greater than :args.',
  gte: 'The :attr must be greater than or equal to :args.',
  length: 'The :attr length is not acceptable.',
  lt: 'The :attr must be less than :args.',
  lte: 'The :attr must be less than or equal to :args.',
  hash: 'The :attr must be a valid :arg0 hash.',
  hex: 'The :attr must be a valid hex.',
  hexColor: 'The :attr must be a valid hex color.',
  in: 'The selected :attr is invalid.',
  integer: 'The :attr must be an integer.',
  ip: 'The :attr must be a valid IP address.',
  ipv4: 'The :attr must be a valid IPv4 address.',
  ipv6: 'The :attr must be a valid IPv6 address.',
  iso8601: 'The :attr must be a valid ISO8601 string.',
  json: 'The :attr must be a valid JSON string.',
  latLong: 'The :attr must be a valid comma-separated latitude and longitude without spaces.',
  lengthBetween: 'The :attr length must be between :arg0 and :arg1.',
  macAddress: 'The :attr must be a valid MAC address.',
  max: 'The :attr cannot be greater than :arg0.',
  maxLength: 'The :attr cannot be greater than :arg0 characters.',
  mime: 'The :attr must be a file of type: :args.',
  min: 'The :attr must be at least :arg0.',
  minLength: 'The :attr cannot be less than :arg0 characters.',
  mongoId: 'The :attr must be a valid MongoDB ID.',
  notContains: 'The :attr must not contain :arg0.',
  notIn: 'The selected :attr is invalid.',
  nullable: 'The :attr is required.',
  numeric: 'The :attr must be a number.',
  object: 'The :attr must be an object.',
  phoneNumber: 'The :attr must be a valid phone number.',
  regex: 'The :attr format is invalid.',
  required: 'The :attr field is required.',
  requiredIf: 'The :attr field is required.',
  requiredNotIf: 'The :attr field is required.',
  requiredWith: 'The :attr field is required.',
  requiredWithAll: 'The :attr field is required.',
  requiredWithout: 'The :attr field is required.',
  requiredWithoutAll: 'The :attr field is required.',
  same: 'The :attr and :arg0 must match.',
  size: 'The :attr must be :arg0.',
  sometimes: 'The :attr is required.',
  string: 'The :attr must be a string.',
  timezone: 'The :attr must be a valid timezone.',
  unique: 'The :attr has already been taken.',
  url: 'The :attr format is invalid.',
  // Example: Custom message parser function
  // validator: (params: any) => {
  //   if (!params.ruleArgs || !params.ruleArgs[0]) {
  //     return messages.$default;
  //   }
  //   const rule = params.ruleArgs[0].replace('is', '').toLowerCase();
  //   // @ts-ignore
  //   return messages[rule] || messages.$default;
  // },
  any: 'At least one of :attr fields must be provided.',
  $niceNames: {},
  $custom: {
    // customAttributeName: 'Message goes here.',
    // 'customAttributeName.ruleName': 'Message goes here.',
  },
  $default: "The :attr validation failed under rule :rule against value :value.",
};
