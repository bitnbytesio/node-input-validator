"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64 = exports.json = exports.ascii = void 0;
const validator_1 = __importDefault(require("validator"));
function ascii() {
    return {
        name: "ascii",
        handler: (value) => {
            return validator_1.default.isAscii(String(value));
        },
    };
}
exports.ascii = ascii;
function json() {
    return {
        name: "json",
        handler: (value) => {
            return validator_1.default.isJSON(String(value));
        },
    };
}
exports.json = json;
function base64() {
    return {
        name: "base64",
        handler: (value) => {
            return validator_1.default.isBase64(String(value));
        },
    };
}
exports.base64 = base64;
//# sourceMappingURL=encoding.rule.js.map