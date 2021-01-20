var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import util from 'util';
import { sizeToBytes } from '../utils/str.util';
/**
 * check if bytes are within given range
 * @param bytes bytes
 * @param max max bytes accepted
 * @param min min bytes required
 * @returns {boolean}
 */
function bytesBetween(bytes, max, min) {
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
export function size(args, trust = false) {
    if (args.length < 1 || args.length > 2) {
        throw new Error('Invalid number of arguments.');
    }
    let minBytes;
    let size;
    const maxBytes = sizeToBytes(args[0]);
    if (args.length >= 2) {
        minBytes = sizeToBytes(args[1]);
    }
    return {
        name: 'size',
        handler: (file) => __awaiter(this, void 0, void 0, function* () {
            if (trust && file.size) {
                return bytesBetween(Number(file.size), maxBytes, minBytes);
            }
            else if (typeof file === 'string' || (file.path && typeof file.path === 'string')) {
                try {
                    const stat = util.promisify(fs.stat);
                    const { size } = yield stat(file.path || file);
                    return bytesBetween(Number(size), maxBytes, minBytes);
                }
                catch (e) {
                    /* istanbul ignore next */
                    console.error(e);
                }
                // return Promise.resolve(false);
            }
            else if (file instanceof Buffer) {
                return bytesBetween(file.byteLength, maxBytes, minBytes);
            }
            return Promise.resolve(false);
        }),
    };
}
//# sourceMappingURL=size.rule.js.map