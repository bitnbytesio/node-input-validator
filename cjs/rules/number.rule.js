"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = exports.decimal = exports.max = exports.min = exports.integer = void 0;
const validator_1 = __importDefault(require("validator"));
function integer() {
    return {
        name: "integer",
        handler: (value) => {
            return validator_1.default.isInt(String(value));
        },
    };
}
exports.integer = integer;
function min(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const minNum = Number(args[0]);
    if (isNaN(minNum)) {
        throw new TypeError('Seed must be number.');
    }
    return {
        name: "min",
        handler: (value) => {
            const v = String(value);
            if (!validator_1.default.isNumeric(v)
                || Number(v) < minNum) {
                return false;
            }
            return true;
        },
    };
}
exports.min = min;
function max(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const maxNum = Number(args[0]);
    if (isNaN(maxNum)) {
        throw new TypeError('Seed must be number.');
    }
    return {
        name: "max",
        handler: (value) => {
            const v = String(value);
            if (!validator_1.default.isNumeric(v)
                || Number(v) > maxNum) {
                return false;
            }
            return true;
        },
    };
}
exports.max = max;
function decimal() {
    return {
        name: "decimal",
        handler: (value) => {
            return validator_1.default.isDecimal(String(value));
        },
    };
}
exports.decimal = decimal;
function numeric() {
    return {
        name: "numeric",
        handler: (value) => {
            return validator_1.default.isNumeric(String(value));
        },
    };
}
exports.numeric = numeric;
//# sourceMappingURL=number.rule.js.map