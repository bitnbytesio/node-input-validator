import { ValidationRuleContract } from "../contracts.js";
export declare function url(args?: Array<string>): ValidationRuleContract;
/**
 * Validates that the URL is active/resolvable by checking if the hostname exists via DNS lookup.
 */
export declare function activeUrl(args?: Array<string>): ValidationRuleContract;
