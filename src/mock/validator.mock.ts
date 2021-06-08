import { AttributeValidationMinimalInfo, ValidatorContract } from "../contracts";

export class ValidatorMock implements ValidatorContract {
  constructor(private inputs: any) { }

  attributeValue(attrName: string): any {
    return this.inputs[attrName];
  }

  createAttributeError(params: AttributeValidationMinimalInfo): void {

  }

  isAttributePresent(attrName:string):boolean {
    return false;
  }

  release():boolean {
    return false;
  }
}
