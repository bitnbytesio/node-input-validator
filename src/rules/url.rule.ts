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

const DEFAULT_DNS_TIMEOUT = 10000; // 10 seconds

/**
 * Validates that the URL is active/resolvable by checking if the hostname exists via DNS lookup.
 * @param args - Array of allowed protocols (default: ['http:', 'https:'])
 * @param timeout - DNS lookup timeout in milliseconds (default: 10000)
 */
export function activeUrl(args: Array<string> = ['http:', 'https:'], timeout: number = DEFAULT_DNS_TIMEOUT): ValidationRuleContract {
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

      let timeoutId: NodeJS.Timeout;

      const dnsLookup = new Promise<boolean>((resolve) => {
        dns.lookup(parsedUrl.hostname, (err) => {
          clearTimeout(timeoutId);
          resolve(!err);
        });
      });

      const timeoutPromise = new Promise<boolean>((resolve) => {
        timeoutId = setTimeout(() => resolve(false), timeout);
      });

      return Promise.race([dnsLookup, timeoutPromise]);
    },
  };
}
