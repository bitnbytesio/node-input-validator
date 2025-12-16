import { ValidatorContract } from "../contracts.js";
/**
 * Post rule: All specified fields must be present in input
 * @param rule - { rule: 'all', params: ['field1', 'field2', ...] }
 * @param v - validator instance
 */
export declare function all(rule: {
    params: Array<string>;
}, v: ValidatorContract): Promise<boolean>;
