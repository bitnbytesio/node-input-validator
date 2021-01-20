"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equals = void 0;
function equals(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [otherValue] = args;
    return {
        name: "equals",
        handler: (value) => {
            return value === otherValue;
        },
    };
}
exports.equals = equals;
//# sourceMappingURL=equals.rule.js.map