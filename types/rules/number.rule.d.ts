import { ValidationRuleContract } from "../contracts.js";
export declare function integer(args?: Array<'0'>): ValidationRuleContract;
export declare function min(args: Array<string>): ValidationRuleContract;
export declare function max(args: Array<string>): ValidationRuleContract;
export declare function decimal(): ValidationRuleContract;
export declare function numeric(): ValidationRuleContract;
