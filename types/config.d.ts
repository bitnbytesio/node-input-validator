/// <reference types="node" />
import { Langs } from "./contracts.js";
import { DateAdapter } from "./date/contracts.js";
export interface IConfig extends NodeJS.Dict<any> {
    lang?: Langs;
    dateAdapter?: DateAdapter;
    implicitRules?: Array<string>;
    multipleErrors: boolean;
}
export declare function set(customConfig: Partial<IConfig>): void;
export declare function get(key?: string, defaultValue?: null): any;
export declare function modify(key: string, value: Langs | DateAdapter): void;
export declare function addImplicitRule(ruleName: string): void;
