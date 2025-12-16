import { ValidationRuleContract } from "../contracts.js";
export declare function ip(args?: Array<'4' | '6'>): ValidationRuleContract;
/**
 * @deprecated Use ip('4') instead
 */
export declare function ipv4(): ValidationRuleContract;
/**
 * @deprecated Use ip('6') instead
 */
export declare function ipv6(): ValidationRuleContract;
