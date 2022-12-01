import { ValidationRuleContract } from "../contracts.js";
/**
 * The field under validation must be between min and max seed.
 * This will work with number as well as array.
 * In case of array, array values must be numbers between min and max seed.
 * @param args seeds
 */
export declare function between(args: Array<string>): ValidationRuleContract;
