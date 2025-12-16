import { ValidatorContract } from "../contracts.js";
/**
 * Post rule: At least one of the specified fields must be present in input
 * @param rule - { rule: 'any', params: ['field1', 'field2', ...] }
 * @param v - validator instance
 */
export declare function any(rule: {
    params: Array<string>;
}, v: ValidatorContract): Promise<boolean>;
