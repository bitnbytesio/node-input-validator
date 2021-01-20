"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimal = void 0;
const validator_1 = __importDefault(require("validator"));
function decimal() {
    return {
        name: "decimal",
        handler: (value) => {
            return validator_1.default.isDecimal(String(value));
        },
    };
}
exports.decimal = decimal;
//# sourceMappingURL=decimal.rule.js.map