/**
 * Borrowed validation functions from validator.js
 * Source: https://github.com/validatorjs/validator.js
 * Updated: December 2024
 */
export declare function isDomain(str: string): boolean;
export declare function isEmail(str: string): boolean;
export declare function isIp(str: string, version?: '4' | '6' | ''): boolean;
export declare function isCreditCard(str: string): boolean;
