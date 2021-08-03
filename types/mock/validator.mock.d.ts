import { AttributeValidationMinimalInfo, ValidatorContract } from "../contracts";
export declare class ValidatorMock implements ValidatorContract {
    private inputs;
    constructor(inputs: any);
    attributeValue(attrName: string): any;
    createAttributeError(params: AttributeValidationMinimalInfo): void;
    isAttributePresent(attrName: string): boolean;
    release(): boolean;
}
