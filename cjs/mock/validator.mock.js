"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorMock = void 0;
class ValidatorMock {
    constructor(inputs) {
        this.inputs = inputs;
    }
    attributeValue(attrName) {
        return this.inputs[attrName];
    }
}
exports.ValidatorMock = ValidatorMock;
//# sourceMappingURL=validator.mock.js.map