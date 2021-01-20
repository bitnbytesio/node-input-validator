"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.after = void 0;
const validator_1 = __importDefault(require("validator"));
function after(args = []) {
    const date = args[0] || undefined;
    return {
        name: "after",
        handler: (value) => {
            return validator_1.default.isAfter(String(value), date);
        },
    };
}
exports.after = after;
//# sourceMappingURL=after.rule.js.map