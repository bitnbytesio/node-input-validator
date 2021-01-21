export function isInt(value: string, allowLeadingZero = false) {
  if (allowLeadingZero) {
    return /^[-+]?[0-9]+$/.test(value);
  }

  return /^(?:[-+]?(?:0|[1-9][0-9]*))$/.test(value);
}

export function isNumeric(value: string) {
  return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
}

export function isDecimal(value: string, strict: boolean = false, decimalDigits: number = 1, seperator: '.' | ',' = '.') {
  const r = new RegExp(`^[-+]?([0-9]+)?(\\${seperator}[0-9]{${decimalDigits},})${strict ? '' : '?'}$`);

  return r.test(value);
}
