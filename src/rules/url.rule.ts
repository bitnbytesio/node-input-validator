import { ValidationRuleContract } from "../contracts.js";
import { URL } from 'url';
import * as dns from 'dns';

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

/**
 * Validates that the URL is active/resolvable by checking if the hostname exists via DNS lookup.
 */
export function activeUrl(args: Array<string> = ['http:', 'https:']): ValidationRuleContract {
  return {
    name: "activeUrl",
    handler: async (value: any): Promise<boolean> => {
      if (typeof value !== 'string') {
        return false;
      }

      let parsedUrl: URL;

      try {
        parsedUrl = new URL(value);
      } catch (_) {
        return false;
      }

      if (args.indexOf(parsedUrl.protocol) < 0) {
        return false;
      }

      return new Promise((resolve) => {
        dns.lookup(parsedUrl.hostname, (err) => {
          resolve(!err);
        });
      });
    },
  };
}
