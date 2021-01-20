import { ValidationRuleContract } from "../contracts";
export declare function booleanStr(): ValidationRuleContract;
export declare function booleanInt(): ValidationRuleContract;
export declare function booleanStrict(): ValidationRuleContract;
/**
 * @deprecated Since version 5.
 * Use booleanStrict,booleanStr,booleanInt instead.
 * @param args
 */
export declare function boolean(args?: Array<any>): ValidationRuleContract;
