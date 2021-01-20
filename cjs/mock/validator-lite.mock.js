"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorLite = void 0;
class ValidatorLite {
    constructor(inputs) {
        this.inputs = inputs;
    }
    attributeValue(attrName) {
        return this.inputs[attrName];
    }
}
exports.ValidatorLite = ValidatorLite;
//# sourceMappingURL=validator-lite.mock.js.map