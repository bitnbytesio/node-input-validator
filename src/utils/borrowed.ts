// credits: https://github.com/validatorjs/validator.js/blob/master/src/lib/isFQDN.js
export function isDomain(value: string) {
  const parts = value.split('.');
  const tld = parts[parts.length - 1];

  // disallow fqdns without tld
  if (parts.length < 2) {
    return false;
  }

  if (!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
    return false;
  }

  // disallow spaces && special characers
  if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
    return false;
  }

  if (/^\d+$/.test(tld)) {
    return false;
  }

  return parts.every((part) => {
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

    if (/_/.test(part)) {
      return false;
    }

    return true;
  });
}

function isByteLength(str: string, options: { min?: number, max?: number }) {
  let min = 0;
  let max;

  if (typeof (options) === 'object') {
    min = options.min || 0;
    max = options.max;
  }

  const len = encodeURI(str).split(/%..|./).length - 1;

  return len >= min && (typeof max === 'undefined' || len <= max);
}

// credits: https://github.com/validatorjs/validator.js/blob/master/src/lib/isEmail.js

const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const defaultMaxEmailLength = 254;

export function isEmail(str: string) {
  if (str.length > defaultMaxEmailLength) {
    return false;
  }

  const parts = str.split('@');
  const domain = parts.pop() || '';
  let user = parts.join('@');

  const lower_domain = domain.toLowerCase();

  if (
    !isByteLength(user, { max: 64 }) ||
    !isByteLength(domain, { max: 254 })
  ) {
    return false;
  }

  if (!isDomain(domain)) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return quotedEmailUserUtf8.test(user);
  }

  const pattern = emailUserUtf8Part;

  const user_parts = user.split('.');
  for (let i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}

const ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const ipv6Block = /^[0-9A-F]{1,4}$/i;

export function isIp(str: string, version: '4' | '6' | '' = ''): boolean {
  if (!version) {
    return isIp(str, '4') || isIp(str, '6');
  }

  if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }

    // @ts-ignore
    const parts = str.split('.').sort((a, b) => a - b);
    // @ts-ignore
    return parts[3] <= 255;
  }

  if (version === '6') {
    let addressAndZone = [str];
    // ipv6 addresses could have scoped architecture
    // according to https://tools.ietf.org/html/rfc4007#section-11
    if (str.includes('%')) {
      addressAndZone = str.split('%');
      if (addressAndZone.length !== 2) {
        // it must be just two parts
        return false;
      }
      if (!addressAndZone[0].includes(':')) {
        // the first part must be the address
        return false;
      }

      if (addressAndZone[1] === '') {
        // the second part must not be empty
        return false;
      }
    }

    const blocks = addressAndZone[0].split(':');
    let foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    const foundIPv4TransitionBlock: boolean = isIp(blocks[blocks.length - 1], '4');
    const expectedNumberOfBlocks: number = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (let i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }

  return false;
}

// credits: https://github.com/validatorjs/validator.js/blob/master/src/lib/isCreditCard.js

const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;

export function isCreditCard(str: string) {
  const sanitized = str.replace(/[- ]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }

  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, (i + 1));
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += ((tmpNum % 10) + 1);
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }

  return !!((sum % 10) === 0 ? sanitized : false);
}
