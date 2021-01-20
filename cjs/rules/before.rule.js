"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.before = void 0;
const validator_1 = __importDefault(require("validator"));
function before(args = []) {
    const date = args[0] || undefined;
    return {
        name: "before",
        handler: (value) => {
            return validator_1.default.isBefore(String(value), date);
        },
    };
}
exports.before = before;
//# sourceMappingURL=before.rule.js.map