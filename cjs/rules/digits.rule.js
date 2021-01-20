"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.digitsBetween = exports.digits = void 0;
const validator_1 = __importDefault(require("validator"));
function digits(args = []) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const [len] = args;
    if (!validator_1.default.isInt(len)) {
        throw new TypeError('Seeds must be number.');
    }
    const lenInt = parseInt(len, 10);
    return {
        name: "digits",
        handler: (value) => {
            const v = String(value);
            if (validator_1.default.isInt(v)
                && v.length === lenInt) {
                return true;
            }
            return false;
        },
    };
}
exports.digits = digits;
function digitsBetween(args = []) {
    if (args.length !== 2) {
        throw new Error('Invalid number of arguments.');
    }
    const [min, max] = args;
    if (!validator_1.default.isInt(min) || !validator_1.default.isInt(max)) {
        throw new TypeError('Seeds must be number.');
    }
    const minInt = parseInt(min, 10);
    const maxInt = parseInt(max, 10);
    return {
        name: "digitsBetween",
        handler: (value) => {
            const v = String(value);
            const len = v.length;
            if (validator_1.default.isInt(v)
                && len >= minInt
                && len <= maxInt) {
                return true;
            }
            return false;
        },
    };
}
exports.digitsBetween = digitsBetween;
//# sourceMappingURL=digits.rule.js.map