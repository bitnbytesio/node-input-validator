"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = void 0;
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
//# sourceMappingURL=integer.rule.js.map