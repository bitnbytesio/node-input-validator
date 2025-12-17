/**
 * Borrowed validation functions from validator.js
 * Source: https://github.com/validatorjs/validator.js
 * Updated: December 2024
 */

// ============================================================================
// isFQDN (isDomain)
// Source: https://github.com/validatorjs/validator.js/blob/master/src/lib/isFQDN.js
// ============================================================================

export function isDomain(str: string): boolean {
  const parts = str.split('.');
  const tld = parts[parts.length - 1];

  // require_tld: true (default)
  if (parts.length < 2) {
    return false;
  }

  // Updated TLD regex from validator.js
  if (!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
    return false;
  }

  // disallow whitespace
  if (/\s/.test(tld)) {
    return false;
  }

  // allow_numeric_tld: false (default)
  if (/^\d+$/.test(tld)) {
    return false;
  }

  return parts.every((part) => {
    // max length 63
    if (part.length > 63) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }

    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    // disallow parts starting or ending with hyphen
    if (/^-|-$/.test(part)) {
      return false;
    }

    // allow_underscores: false (default)
    if (/_/.test(part)) {
      return false;
    }

    return true;
  });
}

// ============================================================================
// isByteLength (helper)
// Source: https://github.com/validatorjs/validator.js/blob/master/src/lib/isByteLength.js
// ============================================================================

function isByteLength(str: string, options: { min?: number; max?: number }): boolean {
  const min = options.min || 0;
  const max = options.max;

  const len = encodeURI(str).split(/%..|./).length - 1;

  return len >= min && (typeof max === 'undefined' || len <= max);
}

// ============================================================================
// isEmail
// Source: https://github.com/validatorjs/validator.js/blob/master/src/lib/isEmail.js
// ============================================================================

const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const defaultMaxEmailLength = 254;

export function isEmail(str: string): boolean {
  // ignore_max_length: false (default)
  if (str.length > defaultMaxEmailLength) {
    return false;
  }

  const parts = str.split('@');
  const domain = parts.pop() || '';
  const user = parts.join('@');

  if (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 })) {
    return false;
  }

  if (!isDomain(domain)) {
    // allow_ip_domain: false (default) - skip IP domain check
    return false;
  }

  if (user[0] === '"' && user[user.length - 1] === '"') {
    const unquotedUser = user.slice(1, user.length - 1);
    // allow_utf8_local_part: true (default)
    return quotedEmailUserUtf8.test(unquotedUser);
  }

  // allow_utf8_local_part: true (default)
  const pattern = emailUserUtf8Part;
  const userParts = user.split('.');

  for (let i = 0; i < userParts.length; i++) {
    if (!pattern.test(userParts[i])) {
      return false;
    }
  }

  return true;
}

// ============================================================================
// isIP
// Source: https://github.com/validatorjs/validator.js/blob/master/src/lib/isIP.js
// ============================================================================

const IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
const IPv4AddressFormat = `(${IPv4SegmentFormat}[.]){3}${IPv4SegmentFormat}`;
const IPv4AddressRegExp = new RegExp(`^${IPv4AddressFormat}$`);

const IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
const IPv6AddressRegExp = new RegExp(
  '^(' +
    `(?:${IPv6SegmentFormat}:){7}(?:${IPv6SegmentFormat}|:)|` +
    `(?:${IPv6SegmentFormat}:){6}(?:${IPv4AddressFormat}|:${IPv6SegmentFormat}|:)|` +
    `(?:${IPv6SegmentFormat}:){5}(?::${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,2}|:)|` +
    `(?:${IPv6SegmentFormat}:){4}(?:(:${IPv6SegmentFormat}){0,1}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,3}|:)|` +
    `(?:${IPv6SegmentFormat}:){3}(?:(:${IPv6SegmentFormat}){0,2}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,4}|:)|` +
    `(?:${IPv6SegmentFormat}:){2}(?:(:${IPv6SegmentFormat}){0,3}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,5}|:)|` +
    `(?:${IPv6SegmentFormat}:){1}(?:(:${IPv6SegmentFormat}){0,4}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,6}|:)|` +
    `(?::((?::${IPv6SegmentFormat}){0,5}:${IPv4AddressFormat}|(?::${IPv6SegmentFormat}){1,7}|:))` +
    ')(%[0-9a-zA-Z-_.]{1,})?$'
);

export function isIp(str: string, version: '4' | '6' | '' = ''): boolean {
  if (!version) {
    return isIp(str, '4') || isIp(str, '6');
  }

  if (version === '4') {
    return IPv4AddressRegExp.test(str);
  }

  if (version === '6') {
    return IPv6AddressRegExp.test(str);
  }

  return false;
}

// ============================================================================
// isCreditCard
// Source: https://github.com/validatorjs/validator.js/blob/master/src/lib/isCreditCard.js
// ============================================================================

// Individual card patterns from validator.js
const cards: { [key: string]: RegExp } = {
  amex: /^3[47][0-9]{13}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/,
};

const allCards = Object.values(cards);

function isLuhnValid(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/[- ]+/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function isCreditCard(str: string): boolean {
  const sanitized = str.replace(/[- ]+/g, '');

  if (!allCards.some((cardRegex) => cardRegex.test(sanitized))) {
    return false;
  }

  return isLuhnValid(str);
}
