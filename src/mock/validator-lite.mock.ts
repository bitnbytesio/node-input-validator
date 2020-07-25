import { ValidatorContract } from "../contracts";

export class ValidatorLite implements ValidatorContract {
  constructor(private inputs: any) {}

  attributeValue(attrName: string): any {
    return this.inputs[attrName];
  }
}
