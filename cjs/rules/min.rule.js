"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
function min(args) {
    return {
        name: "min",
        handler: (value, v) => {
            const [maxNum] = args;
            if (!Number(String(value)) ||
                Number(value) < Number(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
exports.min = min;
//# sourceMappingURL=min.rule.js.map