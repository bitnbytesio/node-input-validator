"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
const ops_util_1 = require("../utils/ops.util");
function required() {
    return {
        name: "required",
        handler: (value) => {
            return ops_util_1.reallyEmpty(value) === false;
        },
    };
}
exports.required = required;
//# sourceMappingURL=required.rule.js.map