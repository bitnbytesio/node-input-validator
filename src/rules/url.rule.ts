import { ValidationRuleContract } from "../contracts";
import { URL } from 'url';

export function url(args: Array<string> = ['http:', 'https:']): ValidationRuleContract {
  return {
    name: "url",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      let url;

      try {
        url = new URL(value);
      } catch (_) {
        return false;
      }

      return args.indexOf(url.protocol) >= 0;
    },
  };
}
