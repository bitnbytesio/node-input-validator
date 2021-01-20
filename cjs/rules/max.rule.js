"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
function max(args) {
    return {
        name: "max",
        handler: (value, v) => {
            const [maxNum] = args;
            if (!Number(String(value)) ||
                Number(value) > Number(v.attributeValue(maxNum))) {
                return false;
            }
            return true;
        },
    };
}
exports.max = max;
//# sourceMappingURL=max.rule.js.map