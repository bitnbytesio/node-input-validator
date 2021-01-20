import { ValidationRuleContract } from "../contracts";
/**
 * The field under validation must be array.
 */
export declare function array(): ValidationRuleContract;
/**
 * The field under validation must be array of unique values.
 * No need to use array rule. This rule will take care of that.
 */
export declare function arrayUnique(): ValidationRuleContract;
/**
 * The field under validation must be array and should have objects with unique attributes as per seed.
 * No need to use array rule. This rule will take care of that.
 * @param args seeds
 */
export declare function arrayUniqueObjects(args: Array<string>): ValidationRuleContract;
/**
 * @since: v5
 * The field under validation must be array of length as per seed.
 * @param args seeds
 */
export declare function arrayLen(args: Array<string>): ValidationRuleContract;
/**
 * @since: v5
 * The field under validation must be array and has length range as per seed.
 * @param args seeds
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
