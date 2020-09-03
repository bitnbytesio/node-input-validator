import { ValidatorContract } from "../contracts";

export class ValidatorMock implements ValidatorContract {
  constructor(private inputs: any) {}

  attributeValue(attrName: string): any {
    return this.inputs[attrName];
  }
}
