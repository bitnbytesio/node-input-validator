import { ValidationRuleContract } from "../contracts";
import { isIp } from '../utils/borrowed';

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
