import { ValidatorContract } from "../contracts";
export declare class ValidatorMock implements ValidatorContract {
    private inputs;
    constructor(inputs: any);
    attributeValue(attrName: string): any;
}
