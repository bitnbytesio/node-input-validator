"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const validator_1 = __importDefault(require("validator"));
function json() {
    return {
        name: "json",
        handler: (value) => {
            return validator_1.default.isJSON(String(value));
        },
    };
}
exports.json = json;
//# sourceMappingURL=json.rule.js.map