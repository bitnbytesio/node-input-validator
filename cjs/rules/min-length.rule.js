"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minLength = void 0;
function minLength(args) {
    return {
        name: "minLength",
        handler: (value, v) => {
            const [maxNum] = args;
            if (value.toString().length < parseInt(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
exports.minLength = minLength;
//# sourceMappingURL=min-length.rule.js.map