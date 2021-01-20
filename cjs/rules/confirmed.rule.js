"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmed = void 0;
function confirmed(args = []) {
    return {
        name: "confirmed",
        handler: (value, v, attrName) => {
            if (value === v.attributeValue(`${attrName}Confirmation`)) {
                return true;
            }
            return false;
        },
    };
}
exports.confirmed = confirmed;
//# sourceMappingURL=confirmed.rule.js.map