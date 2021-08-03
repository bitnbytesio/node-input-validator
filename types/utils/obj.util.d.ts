export declare function getKeyValue(key: string): (obj: any) => any;
export declare function namedArgs(params: Array<string>): {};
export declare function getValueByStringNotation(object: any, notation: string): string;
export declare function isIterable(object: any): boolean;
interface NotationLoopOptions {
    prefix?: Array<any>;
    iterations?: number;
    matchKeys?: Array<string>;
    seperator?: string;
}
export declare function getValuesByWildCardStringNotation(iterable: any, rules?: any, options?: NotationLoopOptions): {
    notationsVals: any;
    notationMap: any;
};
export declare function isObject(item: any): boolean;
export {};
