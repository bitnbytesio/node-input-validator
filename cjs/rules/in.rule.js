"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notIn = exports._in = void 0;
function _in(args) {
    if (!args.length) {
        throw new Error('Invalid number of arguments.');
    }
    return {
        name: "in",
        handler: (value) => {
            return !(args.indexOf(value) < 0);
        },
    };
}
exports._in = _in;
function notIn(args) {
    if (!args.length) {
        throw new Error('Invalid number of arguments.');
    }
    return {
        name: "notIn",
        handler: (value) => {
            return !_in(args).handler(value);
        },
    };
}
exports.notIn = notIn;
//# sourceMappingURL=in.rule.js.map