"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
function regex(args) {
    return {
        name: "regex",
        handler: (value, v) => {
            const [pattren] = args;
            const regexp = new RegExp(v.attributeValue(pattren));
            if (!regexp.test(value)) {
                return false;
            }
            return true;
        },
    };
}
exports.regex = regex;
//# sourceMappingURL=regex.rule.js.map