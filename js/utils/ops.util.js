"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reallyEmpty = void 0;
const validator_1 = require("validator");
function reallyEmpty(value) {
    return validator_1.default.isEmpty((value === undefined || value === null ? "" : value) + "", { ignore_whitespace: false });
}
exports.reallyEmpty = reallyEmpty;
//# sourceMappingURL=ops.util.js.map