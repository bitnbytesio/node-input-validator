import fs from 'fs';
import util from 'util';

import { sizeToBytes } from '../utils/str.util'

import { ValidationRuleContract } from "../contracts";

/**
 * check if bytes are within given range
 * @param bytes bytes
 * @param max max bytes accepted
 * @param min min bytes required
 * @returns {boolean}
 */
function bytesBetween(bytes: number, max: number, min: Number): boolean {
  if (max && bytes > max) {
    return false;
  }

  if (min && bytes < min) {
    return false;
  }

  return true;
}

/**
 * The field under validation should be file path, Buffer or File object.
 * 
 * The file under validation size should be as per given max/min seed.
 * 
 * Size units: b (Bytes), kb/k (KiloBytes), mb/m (MegaBytes), gb/g (GigaBytes). 
 * @param args rule arguments
 * @param trust weather to trust size from file object or not
 * @returns {ValidationRuleContract}
 * @throws {Error} Invalid number of arguments
 */
export function size(args: Array<string>, trust: boolean = false): ValidationRuleContract {
  if (args.length < 1 || args.length > 2) {
    throw new Error('Invalid number of arguments.');
  }

  let minBytes: number; let size;

  const maxBytes: number = sizeToBytes(args[0]);

  if (args.length >= 2) {
    minBytes = sizeToBytes(args[1]);
  }

  return {
    name: 'size',
    handler: async (file: any): Promise<boolean> => {
      if (trust && file.size) {
        return bytesBetween(Number(file.size), maxBytes, minBytes);
      } else if (typeof file === 'string' || (file.path && typeof file.path === 'string')) {
        try {
          const stat = util.promisify(fs.stat);
          const { size } = await stat(file.path || file);
          return bytesBetween(Number(size), maxBytes, minBytes);
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
        // return Promise.resolve(false);
      } else if (file instanceof Buffer) {
        return bytesBetween(file.byteLength, maxBytes, minBytes);
      }

      return Promise.resolve(false);
    },
  };
}
