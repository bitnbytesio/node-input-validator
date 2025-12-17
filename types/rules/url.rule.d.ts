import { ValidationRuleContract } from "../contracts.js";
export declare function url(args?: Array<string>): ValidationRuleContract;
/**
 * Validates that the URL is active/resolvable by checking if the hostname exists via DNS lookup.
 * @param args - Array of allowed protocols (default: ['http:', 'https:'])
 * @param timeout - DNS lookup timeout in milliseconds (default: 10000)
 */
export declare function activeUrl(args?: Array<string>, timeout?: number): ValidationRuleContract;
