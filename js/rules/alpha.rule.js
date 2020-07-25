"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alpha = void 0;
const validator_1 = require("validator");
function alpha() {
    return {
        name: "alpha",
        handler: (value) => {
            return validator_1.default.isAlpha(value + "");
        },
    };
}
exports.alpha = alpha;
//# sourceMappingURL=alpha.rule.js.map