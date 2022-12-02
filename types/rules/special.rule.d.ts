import { ValidationRuleContract } from "../contracts.js";
export declare function nullable(): ValidationRuleContract;
export declare function sometimes(): ValidationRuleContract;
export declare function skip(): ValidationRuleContract;
declare type CustomHandler = ((value: any, v: any, name: string, { inputs }: any) => Promise<boolean> | boolean) | ((...args: any) => Promise<boolean> | boolean);
export declare function custom(handler: CustomHandler): {
    name: string;
    handler: CustomHandler;
};
export {};
