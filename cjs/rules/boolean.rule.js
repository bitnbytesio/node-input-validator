"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = exports.booleanStrict = exports.booleanInt = exports.booleanStr = void 0;
function booleanStr() {
    const args = ["true", "false"];
    return {
        name: "booleanStr",
        handler: (value) => {
            if (args.indexOf(value) >= 0) {
                return true;
            }
            return false;
        },
    };
}
exports.booleanStr = booleanStr;
function booleanInt() {
    const args = [0, 1];
    return {
        name: "booleanInt",
        handler: (value) => {
            if (args.indexOf(value) >= 0) {
                return true;
            }
            return false;
        },
    };
}
exports.booleanInt = booleanInt;
function booleanStrict() {
    const args = [true, false];
    return {
        name: "booleanStrict",
        handler: (value) => {
            if (args.indexOf(value) >= 0) {
                return true;
            }
            return false;
        },
    };
}
exports.booleanStrict = booleanStrict;
/**
 * @deprecated Since version 5.
 * Use booleanStrict,booleanStr,booleanInt instead.
 * @param args
 */
function boolean(args = [true, false, 0, 1, "true", "false", "0", "1"]) {
    console.warn("Rule boolean has be deprecated, please use booleanStrict,booleanStr,booleanInt instead.");
    return {
        name: "boolean",
        handler: (value) => {
            if (args.indexOf(value) >= 0) {
                return true;
            }
            return false;
        },
    };
}
exports.boolean = boolean;
//# sourceMappingURL=boolean.rule.js.map