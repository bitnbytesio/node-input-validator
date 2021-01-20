"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64 = void 0;
const validator_1 = __importDefault(require("validator"));
function base64() {
    return {
        name: "base64",
        handler: (value) => {
            return validator_1.default.isBase64(String(value));
        },
    };
}
exports.base64 = base64;
//# sourceMappingURL=base64.rule.js.map