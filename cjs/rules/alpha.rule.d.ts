import { ValidationRuleContract } from "../contracts";
/**
 * The field under validation must be entirely alphabetic characters.
 */
export declare function alpha(): ValidationRuleContract;
/**
 * The field under validation may have alpha characters, as well as hyphens and underscores.
 */
export declare function alphaDash(): ValidationRuleContract;
/**
 * The field under validation may have alpha characters, as well as hyphens.
 */
export declare function alphaHyphen(): ValidationRuleContract;
/**
 * The field under validation must contains alpha-numeric characters.
 */
export declare function alphaNumeric(): ValidationRuleContract;
/**
 * The field under validation may have alpha-numeric characters, as well as hyphens and underscores.
 */
export declare function alphaNumericDash(): ValidationRuleContract;
