"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexColor = exports.hex = void 0;
const validator_1 = __importDefault(require("validator"));
function hex() {
    return {
        name: "hex",
        handler: (value) => {
            return validator_1.default.isHexadecimal(String(value));
        },
    };
}
exports.hex = hex;
function hexColor() {
    return {
        name: "hexColor",
        handler: (value) => {
            return validator_1.default.isHexColor(String(value));
        },
    };
}
exports.hexColor = hexColor;
//# sourceMappingURL=hex.rule.js.map