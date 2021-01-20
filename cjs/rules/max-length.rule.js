"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLength = void 0;
function maxLength(args) {
    return {
        name: "maxLength",
        handler: (value, v) => {
            const [maxNum] = args;
            if (value.toString().length > parseInt(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
exports.maxLength = maxLength;
//# sourceMappingURL=max-length.rule.js.map