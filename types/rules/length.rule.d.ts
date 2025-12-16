import { ValidationRuleContract } from "../contracts.js";
export declare function maxLength(args: Array<string>): ValidationRuleContract;
export declare function minLength(args: Array<string>): ValidationRuleContract;
/**
 * Validates that the value's length is at most `max`, and optionally at least `min`.
 *
 * @param args[0] max - Maximum length allowed
 * @param args[1] min - (Optional) Minimum length required
 *
 * @example
 * // Max length only: value must be at most 10 characters
 * 'username': 'length:10'
 *
 * // Range: value must be between 5 and 10 characters
 * 'username': 'length:10,5'
 */
export declare function length(args: Array<string>): ValidationRuleContract;
export declare function lengthBetween(args: Array<string>): ValidationRuleContract;
