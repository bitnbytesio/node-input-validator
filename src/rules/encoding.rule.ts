import { ValidationRuleContract } from "../contracts.js";

const asciiRegex = /^[\x00-\x7F]+$/;

export function ascii(): ValidationRuleContract {
  return {
    name: "ascii",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return asciiRegex.test(value);
    },
  };
}

export function json(): ValidationRuleContract {
  return {
    name: "json",
    handler: (value: any) => {
      try {
        const obj = JSON.parse(value);
        return !!obj && typeof obj === 'object';
      } catch (e) {
        /* ignore */
      }

      return false;
    },
  };
}

const notBase64 = /[^A-Z0-9+\/=]/i;
const urlSafeBase64 = /^[A-Z0-9_\-]*$/i;

export function base64(args: Array<'urlsafe'> = []): ValidationRuleContract {
  return {
    name: "base64",
    handler: (value: any) => {
      const len = value.length;

      if (args && args[0] === 'urlsafe') {
        return urlSafeBase64.test(value);
      }
      if (len % 4 !== 0 || notBase64.test(value)) {
        return false;
      }

      const firstPaddingChar = value.indexOf('=');
      return firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && value[len - 1] === '=');
    },
  };
}
