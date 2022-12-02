import { ValidationRuleContract } from "../contracts.js";
/**
 * @since v3.6
 *
 * The field under validation must be a valid ISO date string
 * @returns
 */
export declare function dateiso(): ValidationRuleContract;
/**
 * @alias {@link dateiso}
 *
 * The field under validation must be a valid ISO date string.
 * @returns
 */
export declare function iso8601(): ValidationRuleContract;
