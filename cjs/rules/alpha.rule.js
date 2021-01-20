"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumericDash = exports.alphaNumeric = exports.alphaHyphen = exports.alphaDash = exports.alpha = void 0;
const validator_1 = __importDefault(require("validator"));
/**
 * The field under validation must be entirely alphabetic characters.
 */
function alpha() {
    return {
        name: "alpha",
        handler: (value) => {
            return validator_1.default.isAlpha(value + "");
        },
    };
}
exports.alpha = alpha;
/**
 * The field under validation may have alpha characters, as well as hyphens and underscores.
 */
function alphaDash() {
    return {
        name: "alphaDash",
        handler: (value) => {
            if (!(/^[A-Z_-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
exports.alphaDash = alphaDash;
/**
 * The field under validation may have alpha characters, as well as hyphens.
 */
function alphaHyphen() {
    return {
        name: "alphaHyphen",
        handler: (value) => {
            if (!(/^[A-Z-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
exports.alphaHyphen = alphaHyphen;
/**
 * The field under validation must contains alpha-numeric characters.
 */
function alphaNumeric() {
    return {
        name: "alphaNumeric",
        handler: (value) => {
            return validator_1.default.isAlphanumeric(value + "");
        },
    };
}
exports.alphaNumeric = alphaNumeric;
/**
 * The field under validation may have alpha-numeric characters, as well as hyphens and underscores.
 */
function alphaNumericDash() {
    return {
        name: "alphaNumericDash",
        handler: (value) => {
            if (!(/^[A-Z0-9_-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
exports.alphaNumericDash = alphaNumericDash;
//# sourceMappingURL=alpha.rule.js.map