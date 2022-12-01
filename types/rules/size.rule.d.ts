import { ValidationRuleContract } from "../contracts.js";
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
export declare function size(args: Array<string>, trust?: boolean): ValidationRuleContract;
