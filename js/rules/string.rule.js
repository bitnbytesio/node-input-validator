"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
function string() {
    return {
        name: "string",
        handler: (value) => {
            return typeof value === "string";
        },
    };
}
exports.string = string;
//# sourceMappingURL=string.rule.js.map