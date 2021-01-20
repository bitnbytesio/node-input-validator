"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sometimes = exports.nullable = void 0;
function nullable() {
    return {
        name: "nullable",
        handler: (value) => {
            return true;
        },
    };
}
exports.nullable = nullable;
function sometimes() {
    return {
        name: "sometimes",
        handler: (value) => {
            return true;
        },
    };
}
exports.sometimes = sometimes;
//# sourceMappingURL=special.rule.js.map