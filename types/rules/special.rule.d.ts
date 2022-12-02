import { ValidationRuleContract } from "../contracts.js";
/**
 * The field under validation is not required when set to null
 * @returns
 */
export declare function nullable(): ValidationRuleContract;
/**
 * The field under validation is only required if present
 * @returns
 */
export declare function sometimes(): ValidationRuleContract;
/**
 * @since v5
 *
 * The field under validation will be skipped
 * @returns
 */
export declare function skip(): ValidationRuleContract;
declare type CustomHandler = ((value: any, v: any, name: string, { inputs }: any) => Promise<boolean> | boolean) | ((...args: any) => Promise<boolean> | boolean);
/**
 * @since v5
 *
 * Apply custom rule on fly
 * @param handler
 * @returns
 */
export declare function custom(handler: CustomHandler): {
    name: string;
    handler: CustomHandler;
};
export {};
