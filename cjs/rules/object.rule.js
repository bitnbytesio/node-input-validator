"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
function object() {
    return {
        name: "object",
        handler: (value) => {
            return (!!value) && (value.constructor === Object);
        },
    };
}
exports.object = object;
//# sourceMappingURL=object.rule.js.map