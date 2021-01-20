/// <reference types="node" />
import { Langs } from "./contracts";
export interface IConfig extends NodeJS.Dict<any> {
    wildcardIterations?: number;
    wildcardSeperator?: string;
    lang?: Langs;
}
export declare function set(customConfig: IConfig): void;
export declare function get(key?: string, defaultValue?: null): any;
