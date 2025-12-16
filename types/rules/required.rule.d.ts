import { ValidationRuleContract } from "../contracts.js";
export declare function required(): ValidationRuleContract;
export declare function requiredIf(args: Array<string>): ValidationRuleContract;
/**
 * The attribute under validation is required,
 * unless another attribute matches a specific value.
 * @param args [field, value] pairs - field may be blank if field === value
 */
export declare function requiredNotIf(args: Array<string>): ValidationRuleContract;
/**
 * The attribute under validation consider required,
 * if any attribute given in seed is empty or missing.
 * @param args attribute names
 */
export declare function requiredWithout(args: Array<string>): ValidationRuleContract;
/**
 * The attribute under validation consider required,
 * if any all the given attibutes in seed are empty or missing.
 * @since v5
 * @param args attribute names
 */
export declare function requiredWithoutAll(args: Array<string>): ValidationRuleContract;
/**
 * The attribute under validation consider required,
 * if any attribute given in seed has valid value.
 * @param args attribute names
 */
export declare function requiredWith(args: Array<string>): ValidationRuleContract;
/**
 * The attribute under validation consider required,
 * if all the given attributes in seed has valid values.
 * @since v5
 * @param args attribute names
 */
export declare function requiredWithAll(args: Array<string>): ValidationRuleContract;
