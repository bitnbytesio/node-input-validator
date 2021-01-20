"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = void 0;
const validator_1 = __importDefault(require("validator"));
function numeric() {
    return {
        name: "numeric",
        handler: (value) => {
            return validator_1.default.isNumeric(String(value));
        },
    };
}
exports.numeric = numeric;
//# sourceMappingURL=numeric.rule.js.map