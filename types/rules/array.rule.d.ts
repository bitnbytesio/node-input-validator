import { ValidationRuleContract } from "../contracts.js";
/**
 * The field under validation must be array.
 */
export declare function array(): ValidationRuleContract;
/**
 * @since v3.5
 *
 * The field under validation must be array of unique values.
 * No need to use array rule. This rule will take care of that.
 */
export declare function arrayUnique(): ValidationRuleContract;
/**
 * @since v3.5
 *
 * The field under validation must be array and should have objects with unique attributes as per seed.
 * No need to use array rule. This rule will take care of that.
 * @param args seeds
 */
export declare function arrayUniqueObjects(args: Array<string>): ValidationRuleContract;
/**
 * @since v5
 *
 * The field under validation must be array of length as per seed.
 * @param args seeds
 */
export declare function arrayLen(args: Array<string>): ValidationRuleContract;
/**
 * Validates that the array has at most `max` items, and optionally at least `min` items.
 *
 * @since v5
 * @param args[0] max - Maximum number of items allowed
 * @param args[1] min - (Optional) Minimum number of items required
 *
 * @example
 * // Max only: array must have at most 5 items
 * 'items': 'arrayLenRange:5'
 *
 * // Range: array must have between 2 and 5 items
 * 'items': 'arrayLenRange:5,2'
 */
export declare function arrayLenRange(args: Array<string>): ValidationRuleContract;
/**
 * @since: v5
 * The field under validation must be array and has minumun length as per seed.
 * @param args seeds
 */
export declare function arrayLenMin(args: Array<string>): ValidationRuleContract;
/**
 * @since: v5
 * The field under validation must be array and has maximum length as per seed.
 * @param args seeds
 */
export declare function arrayLenMax(args: Array<string>): ValidationRuleContract;
