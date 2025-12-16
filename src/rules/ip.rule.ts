import { ValidationRuleContract } from "../contracts.js";
import { isIp } from '../utils/borrowed.js';

export function ip(args: Array<'4' | '6'> = []): ValidationRuleContract {
  return {
    name: "ip",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isIp(value, args[0] || '');
    },
  };
}

/**
 * @deprecated Use ip('4') instead
 */
export function ipv4(): ValidationRuleContract {
  return {
    name: "ipv4",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isIp(value, '4');
    },
  };
}

/**
 * @deprecated Use ip('6') instead
 */
export function ipv6(): ValidationRuleContract {
  return {
    name: "ipv6",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return isIp(value, '6');
    },
  };
}
