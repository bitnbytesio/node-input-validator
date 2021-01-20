import { ValidatorContract } from "../contracts";
export declare class ValidatorLite implements ValidatorContract {
    private inputs;
    constructor(inputs: any);
    attributeValue(attrName: string): any;
}
