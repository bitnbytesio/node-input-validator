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
